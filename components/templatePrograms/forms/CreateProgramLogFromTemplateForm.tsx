import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { CountDays } from '../../util/CountDays';
import CalendarSelectFrom from './CalendarSelectForm';
import DayCheckboxForm from './DayCheckboxForm';
import { FormButton } from '../../common/Buttons';
import WeightSelectionForm from './WeightSelectionForm';
import { DayValue } from 'react-modern-calendar-datepicker';
import RepeatTemplateForm from './RepeatTemplateForm';
import { ITemplateProgramExtended, IWeightInput, IWorkoutLogTemplateInput } from 'powerbuddy-shared';
import { useUserContext } from '../../users/UserContext';
import axios from 'axios';
import { CreateWorkoutLogFromTemplateUrl, GetWorkoutLogCalendarDatesUrl } from '../../../api/account/workoutLog';
import { Box } from '../../../chakra/Layout';
import useFireToast from '../../../hooks/useFireToast';
import { WORKOUT_LOG_EXISTS_ON_DATE } from '../../../api/apiResponseCodes';
import { useAxios } from '../../../hooks/useAxios';

interface IProps {
  onClose: () => void;
  template: ITemplateProgramExtended;
  onCreateSuccessOpen: () => void;
}

const CreateProgramLogFromTemplateForm: React.FC<IProps> = ({ onClose, template, onCreateSuccessOpen }) => {
  const { userId } = useUserContext();
  const { data: calendarData } = useAxios<Date[]>(GetWorkoutLogCalendarDatesUrl());
  const [weightInput, setWeightInputs] = useState<IWeightInput[]>();
  const [curWeightInputs, setCurWeightInputs] = useState<IWeightInput[]>([]);
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
  const toast = useFireToast();

  // useEffect(() => {
  //   if (calendarDate) {
  //     const calDate = `${calendarDate.month}/${calendarDate.day}/${calendarDate.year}`;
  //     const momentDate = moment(calDate).toDate();
  //     setSelectedDate(momentDate);

  //     moment(momentDate).day() === 1 ? setMonChecked(true) : setMonChecked(false);
  //     moment(momentDate).day() === 2 ? setTueChecked(true) : setTueChecked(false);
  //     moment(momentDate).day() === 3 ? setWedChecked(true) : setWedChecked(false);
  //     moment(momentDate).day() === 4 ? setThuChecked(true) : setThuChecked(false);
  //     moment(momentDate).day() === 5 ? setFriChecked(true) : setFriChecked(false);
  //     moment(momentDate).day() === 6 ? setSatChecked(true) : setSatChecked(false);
  //     moment(momentDate).day() === 0 ? setSunChecked(true) : setSunChecked(false);
  //   }
  // }, [calendarDate]);

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
      toast.Warning(`Please select ${template.noOfDaysPerWeek} Days for this Program`);
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
        toast.Success('Diary successfully created, visit the diary section to begin tracking');
        onClose();
        onCreateSuccessOpen();
      } catch (error) {
        if (error?.response?.data?.code === WORKOUT_LOG_EXISTS_ON_DATE) {
          toast.Warning(`This new log clashes with your program ${error?.response?.data?.message}`);
        } else {
          toast.Error('Diary could not be created, please try again later');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {phase === 1 && (
        <Box>
          <CalendarSelectFrom selectedDate={selectedDate} setSelectedDate={setSelectedDate} workoutDates={calendarData} />
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
