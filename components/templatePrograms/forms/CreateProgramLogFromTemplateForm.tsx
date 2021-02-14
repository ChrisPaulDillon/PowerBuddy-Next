import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { CountDays } from '../../util/CountDays';
import { useToast } from '@chakra-ui/react';
import CalendarSelectFrom from './CalendarSelectForm';
import DayCheckboxForm from './DayCheckboxForm';
import { FormButton } from '../../common/Buttons';
import WeightSelectionForm from './WeightSelectionForm';
import { DayValue } from 'react-modern-calendar-datepicker';
import RepeatTemplateForm from './RepeatTemplateForm';
import { ITemplateProgramExtended, IWeightInput, IWorkoutLogTemplateInput } from 'powerbuddy-shared';
import { useUserContext } from '../../users/UserContext';
import axios from 'axios';
import { CreateWorkoutLogFromTemplateUrl } from '../../../api/account/workoutLog';
import { ToastError, ToastSuccess } from '../../shared/Toasts';
import { Box } from '../../../chakra/Layout';

interface IProps {
  onClose: () => void;
  template: ITemplateProgramExtended;
  onCreateSuccessOpen: () => void;
}

const CreateProgramLogFromTemplateForm: React.FC<IProps> = ({ onClose, template, onCreateSuccessOpen }) => {
  const { userId } = useUserContext();
  // const { data: calendarData, loading: calendarLoading } = useAxios<IProgramLogCalendarStats>(GetAllProgramLogCalendarStatsQueryUrl());
  const [weightInput, setWeightInputs] = useState<IWeightInput[]>();
  const [curWeightInputs, setCurWeightInputs] = useState<IWeightInput[]>([]);
  const [calendarDate, setCalendarDate] = useState<DayValue>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [, setRepeatProgramCount] = useState<number>(1);
  const [incrementalWeightInput, setIncrementalWeightInput] = useState<IWeightInput[]>([]);
  const [phase, setPhase] = useState<number>(1);
  const [monChecked, setMonChecked] = useState<boolean>(false);
  const [tueChecked, setTueChecked] = useState<boolean>(false);
  const [wedChecked, setWedChecked] = useState<boolean>(false);
  const [thuChecked, setThuChecked] = useState<boolean>(false);
  const [friChecked, setFriChecked] = useState<boolean>(false);
  const [satChecked, setSatChecked] = useState<boolean>(false);
  const [sunChecked, setSunChecked] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    if (calendarDate) {
      const calDate = `${calendarDate.month}/${calendarDate.day}/${calendarDate.year}`;
      const momentDate = moment(calDate).toDate();
      setSelectedDate(momentDate);

      moment(momentDate).day() === 1 ? setMonChecked(true) : setMonChecked(false);
      moment(momentDate).day() === 2 ? setTueChecked(true) : setTueChecked(false);
      moment(momentDate).day() === 3 ? setWedChecked(true) : setWedChecked(false);
      moment(momentDate).day() === 4 ? setThuChecked(true) : setThuChecked(false);
      moment(momentDate).day() === 5 ? setFriChecked(true) : setFriChecked(false);
      moment(momentDate).day() === 6 ? setSatChecked(true) : setSatChecked(false);
      moment(momentDate).day() === 0 ? setSunChecked(true) : setSunChecked(false);
    }
  }, [calendarDate]);

  useEffect(() => {
    weightInput && setCurWeightInputs(weightInput);
    weightInput && setIncrementalWeightInput(weightInput);
  }, [weightInput]);

  useEffect(() => {
    setWeightInputs(
      template?.templateExerciseCollection.map<IWeightInput>((tec) => {
        return { exerciseId: tec.exerciseId, exerciseName: tec.exerciseName, weight: 0 };
      })
    );
  }, [template.templateExerciseCollection]);

  const updateWeightInput = (exerciseId: number, updatedWeightInput: number): void => {
    setCurWeightInputs(curWeightInputs.map((x) => (x.exerciseId === exerciseId ? { ...x, weight: updatedWeightInput } : x)));
  };

  const updateIncrementalWeightInput = (exerciseId: number, updatedWeightInput: number): void => {
    setIncrementalWeightInput(incrementalWeightInput.map((x) => (x.exerciseId === exerciseId ? { ...x, weight: updatedWeightInput } : x)));
  };

  const updateRepeatProgramCount = (times: number) => {
    times && setRepeatProgramCount(times);
  };

  const { handleSubmit, formState } = useForm();

  const onSubmit = async () => {
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
    } else if (phase < 4) {
      setPhase(phase + 1);
    } else {
      try {
        const workoutLog: IWorkoutLogTemplateInput = {
          userId: userId,
          templateProgramId: template?.templateProgramId,
          startDate: selectedDate,
          monday: monChecked,
          tuesday: tueChecked,
          wednesday: wedChecked,
          thursday: thuChecked,
          friday: friChecked,
          saturday: satChecked,
          sunday: sunChecked,
          dayCount: dayCount,
          weightInputs: curWeightInputs,
        };
        await axios.post(CreateWorkoutLogFromTemplateUrl(template?.templateProgramId), workoutLog);
        toast(ToastSuccess('Success', 'Diary successfully created, visit the diary section to begin tracking'));
        onClose();
        onCreateSuccessOpen();
      } catch (error) {
        if (error?.response?.status === 400) {
          toast(ToastError('Warning', 'You already have a diary entry active for this time period!'));
        } else {
          toast(ToastError('Error', 'Diary could not be created, please try again later'));
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {phase === 1 && (
        <Box display={phase === 1 ? 'inline' : 'none'}>
          <CalendarSelectFrom
            selectedDate={selectedDate}
            calendarDate={calendarDate}
            setCalendarDate={setCalendarDate}
            // workoutDates={calendarData?.workoutDates!}
          />
        </Box>
      )}
      {phase === 2 && (
        <Box>
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
            noOfDaysPerWeek={template.noOfDaysPerWeek}
          />
        </Box>
      )}
      {phase === 3 && (
        <Box>
          {weightInput && (
            <WeightSelectionForm
              weightProgressionType={template.weightProgressionType}
              weightInput={curWeightInputs!}
              updateWeightInput={updateWeightInput}
            />
          )}
        </Box>
      )}
      {phase === 4 && (
        <RepeatTemplateForm
          incrementalWeightInput={incrementalWeightInput!}
          updateIncrementalWeightInput={updateIncrementalWeightInput}
          updateRepeatProgramCount={updateRepeatProgramCount}
        />
      )}
      <FormButton isLoading={formState.isSubmitting}>{phase < 4 ? 'Continue' : 'Create'}</FormButton>
    </form>
  );
};

export default CreateProgramLogFromTemplateForm;
