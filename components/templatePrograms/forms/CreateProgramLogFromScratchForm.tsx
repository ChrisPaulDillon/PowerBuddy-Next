import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, FormControl, FormErrorMessage, Select, useToast } from '@chakra-ui/core';
import { CenterColumnFlex } from '../../layout/Flexes';
import { PbPrimaryButton } from '../../common/Buttons';
import CalendarSelectFrom from './CalendarSelectForm';
import { staticNumberList } from '../../common/static';
import { TextXs } from '../../common/Texts';
import { validateInput } from '../../../util/formInputs';
import moment from 'moment';
import ProgramSummary from './ProgramSummary';
import { useEffect } from 'react';
import { DayValue } from 'react-modern-calendar-datepicker';
import { useUserContext } from '../../users/UserContext';
import { CreateWorkoutLogFromScratchUrl } from '../../../api/account/workoutLog';
import axios from 'axios';

export interface IWorkoutLogInputScratch {
  noOfWeeks: number;
  startDate: Date | undefined;
  endDate?: Date | undefined;
  userId: string;
  customName: string;
}

interface IProps {
  workoutDates?: Array<Date>;
  onClose: () => void;
  onCreateSuccessOpen: () => void;
}

const CreateProgramLogFromScratchForm: React.FC<IProps> = ({ onClose, onCreateSuccessOpen }) => {
  // const { data: calendarData, loading: calendarLoading } = useAxios<IProgramLogCalendarStats>(GetAllProgramLogCalendarStatsQueryUrl());
  const { userId } = useUserContext();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [calendarDate, setCalendarDate] = useState<DayValue>();
  const [endDate, setEndDate] = useState<Date>();
  const [phase, setPhase] = useState<number>(1);
  const [customName, setCustomName] = useState<string>('Custom Template');
  const [noOfWeeks, setNoOfWeeks] = useState<number>(0);
  const toast = useToast();

  useEffect(() => {
    if (calendarDate) {
      let date = `${calendarDate.month}/${calendarDate.day}/${calendarDate.year}`;
      setSelectedDate(moment(date).toDate());
    }
  }, [calendarDate]);

  const updateCustomName = (e: { target: { value: React.SetStateAction<string> } }) => {
    if (e && e.target && e.target.value) {
      setCustomName(e.target.value);
    }
  };

  const { handleSubmit, register, errors, formState } = useForm();

  const onSubmit = async () => {
    if (phase < 2) {
      setEndDate(moment(selectedDate).add(noOfWeeks!, 'weeks').toDate());
      setPhase(phase + 1);
    } else {
      try {
        const workoutLogInput: IWorkoutLogInputScratch = {
          userId: userId,
          startDate: selectedDate,
          noOfWeeks: noOfWeeks,
          customName: customName,
        };
        const response = await axios.post(CreateWorkoutLogFromScratchUrl(), workoutLogInput);
        toast({
          title: 'Success',
          description: 'Diary successfully created, visit the diary section to begin tracking',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        onCreateSuccessOpen();
      } catch (error) {
        if (error?.response?.status === 400) {
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
            description: 'Could not create Diary Log, please try again later',
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
      {phase === 1 ? (
        <Box display={phase === 1 ? 'inline' : 'none'}>
          <FormControl isInvalid={errors.noOfWeeks}>
            <CenterColumnFlex mb="2">
              <TextXs p="1" mb="1">
                Select Program Start Date & Number of Weeks
              </TextXs>
              <Select
                placeholder="No Of Weeks..."
                ref={register({ validate: validateInput })}
                name="noOfWeeks"
                size="sm"
                onChange={(e) => setNoOfWeeks(parseInt(e.target.value))}>
                {staticNumberList.map((x, idx) => (
                  <option value={x.value} key={idx}>
                    {x.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.noOfWeeks && errors.noOfWeeks.message}</FormErrorMessage>
            </CenterColumnFlex>
          </FormControl>
          <CalendarSelectFrom
            selectedDate={selectedDate}
            calendarDate={calendarDate}
            setCalendarDate={setCalendarDate}
            // workoutDates={calendarData?.workoutDates!}
          />
        </Box>
      ) : (
        <Box />
      )}
      {phase === 2 ? (
        <Box display={phase === 2 ? 'inline' : 'none'}>
          <ProgramSummary setCustomName={updateCustomName} startDate={selectedDate} endDate={endDate} />
        </Box>
      ) : (
        <Box />
      )}

      <CenterColumnFlex p="3" mt="2">
        <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
          {phase < 3 ? 'Continue' : 'Complete'}
        </PbPrimaryButton>
      </CenterColumnFlex>
    </form>
  );
};

export default CreateProgramLogFromScratchForm;
