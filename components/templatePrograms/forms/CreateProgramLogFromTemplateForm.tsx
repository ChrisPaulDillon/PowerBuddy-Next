import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { CountDays } from '../../util/CountDays';
import { createProgramLogFromTemplate } from '../../../redux/area/account/programLogActions';
import { Box, useToast } from '@chakra-ui/core';
import CalendarSelectFrom from './CalendarSelectForm';
import DayCheckboxForm from './DayCheckboxForm';
import { CenterColumnFlex } from '../../layout/Flexes';
import { PbPrimaryButton } from '../../common/Buttons';
import { ITemplateProgramExtended } from '../../../interfaces/templates';
import { ILiftingStat } from '../../../interfaces/liftingStats';
import WeightSelectionForm from './WeightSelectionForm';
import { IProgramLogInputTemplate } from '../../programLog/interfaces';
import { IAppState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { GetPersonalBestsForTemplate } from '../../../api/account/liftingStats';
import { useAxios } from '../../../hooks/useAxios';
import axios from 'axios';
import { CreateProgramLogFromTemplateUrl } from '../../../api/account/programLog';
import { IWeightInput } from '../interfaces';

interface IProps {
  onClose: () => void;
  template: ITemplateProgramExtended;
}

const CreateProgramLogFromTemplateForm: React.FC<IProps> = ({ onClose, template }) => {
  const { data: weightInput } = useAxios<IWeightInput[]>(GetPersonalBestsForTemplate(template.templateProgramId!));
  const [curWeightInputs, setCurWeightInputs] = useState<IWeightInput[]>([]);
  const { user } = useSelector((state: IAppState) => state.state);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [phase, setPhase] = useState<number>(1);
  const [monChecked, setMonChecked] = useState<boolean>(moment(selectedDate).day() === 1);
  const [tueChecked, setTueChecked] = useState<boolean>(moment(selectedDate).day() === 2);
  const [wedChecked, setWedChecked] = useState<boolean>(moment(selectedDate).day() === 3);
  const [thuChecked, setThuChecked] = useState<boolean>(moment(selectedDate).day() === 4);
  const [friChecked, setFriChecked] = useState<boolean>(moment(selectedDate).day() === 5);
  const [satChecked, setSatChecked] = useState<boolean>(moment(selectedDate).day() === 6);
  const [sunChecked, setSunChecked] = useState<boolean>(moment(selectedDate).day() === 7);
  const toast = useToast();

  useEffect(() => {
    weightInput && setCurWeightInputs(weightInput);
  }, [weightInput]);

  const updateWeightInput = (exerciseId: number, weightInput: string) => {
    setCurWeightInputs(curWeightInputs.map((x) => (x.exerciseId === exerciseId ? { ...x, weight: parseInt(weightInput) } : x)));
  };

  const { handleSubmit, formState } = useForm();

  const onSubmit = async (data: any) => {
    let dayCount = CountDays(monChecked, tueChecked, wedChecked, thuChecked, friChecked, satChecked, sunChecked);
    if (dayCount !== template.noOfDaysPerWeek && phase === 2) {
      toast({
        title: 'Warning',
        description: `Please select ${template.noOfDaysPerWeek} Days for this Program`,
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } else if (phase < 3) {
      setPhase(phase + 1);
    } else {
      const programLogToCreate: IProgramLogInputTemplate = {
        userId: user!.userId!,
        noOfWeeks: template.noOfWeeks!,
        monday: monChecked,
        tuesday: tueChecked,
        wednesday: wedChecked,
        thursday: thuChecked,
        friday: friChecked,
        saturday: satChecked,
        sunday: sunChecked,
        startDate: selectedDate,
        endDate: moment(selectedDate).add(template.noOfWeeks!, 'weeks').toDate(),
        dayCount: dayCount,
        templateProgramId: template.templateProgramId!,
        active: true,
        weightInputs: curWeightInputs,
      };

      const { templateProgramId } = template;

      try {
        const response = await axios.post(CreateProgramLogFromTemplateUrl(templateProgramId), programLogToCreate);
        toast({
          title: 'Success',
          description: 'Diary successfully created, visit the diary section to begin tracking',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      } catch (error) {
        if (error.response.status === 400) {
          toast({
            title: 'Warning',
            description: 'You already have a diary entry active for this time period!',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        } else {
          toast({
            title: 'Error',
            description: 'Diary could not be created, please try again later',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'top-right',
          });
        }
      }
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={phase === 1 ? 'inline' : 'none'}>
        <CalendarSelectFrom selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </Box>
      <Box display={phase === 2 ? 'inline' : 'none'}>
        <DayCheckboxForm
          selectedDate={selectedDate}
          monChecked={monChecked}
          setMonChecked={setMonChecked}
          tueChecked={tueChecked}
          setTueChecked={setTueChecked}
          wedChecked={wedChecked}
          setWedChecked={setWedChecked}
          thuChecked={thuChecked}
          setThuChecked={setThuChecked}
          friChecked={friChecked}
          setFriChecked={setFriChecked}
          satChecked={satChecked}
          setSatChecked={setSatChecked}
          sunChecked={sunChecked}
          setSunChecked={setSunChecked}
          templateProgram={template}
        />
      </Box>
      <Box display={phase === 3 ? 'inline' : 'none'}>
        {weightInput && (
          <WeightSelectionForm
            weightProgressionType={template.weightProgressionType}
            weightInput={curWeightInputs!}
            updateWeightInput={updateWeightInput}
          />
        )}
      </Box>
      <CenterColumnFlex mt="4">
        <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
          {phase < 4 ? 'CONTINUE' : 'CREATE'}
        </PbPrimaryButton>
      </CenterColumnFlex>
    </form>
  );
};

export default CreateProgramLogFromTemplateForm;
