import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PbPrimaryButton } from '../../common/Buttons';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../redux/store';
import { CenterColumnFlex } from '../../layout/Flexes';
import { DatePickerFixedExcludeDays } from '../../common/DatePickerFixed';
import useGetProgramLogDayDates from '../../../hooks/programLogs/useGetProgramLogDayDates';
import { IProgramLogDay } from '../../../interfaces/programLogs/index';
import moment from 'moment';
import { useProgramLogContext } from '../ProgramLogContext';
import axios from 'axios';
import { CreateProgramLogDayUrl } from '../../../api/account/programLogDay';
import { useToast } from '@chakra-ui/core';

interface IProps {
  onClose: () => void;
}

const AddProgramDayForm: React.FC<IProps> = ({ onClose }) => {
  const { user } = useSelector((state: IAppState) => state.state);
  const { programLogWeek } = useProgramLogContext();
  const [startDate, setStartDate] = useState<Date>(moment(programLogWeek.startDate).toDate());
  const dayDates = useGetProgramLogDayDates(programLogWeek);
  const toast = useToast();
  const { AddDay } = useProgramLogContext();

  const { handleSubmit, formState } = useForm();

  const onSubmit = async () => {
    const programLogDay: IProgramLogDay = {
      programLogWeekId: programLogWeek.programLogWeekId,
      date: startDate,
      userId: user.userId,
      programLogExercises: [],
    };

    try {
      const response = await axios.post(CreateProgramLogDayUrl(), programLogDay);
      AddDay(response.data);
      toast({
        title: 'Success',
        description: 'Successfully added Program Day',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (ex) {
      toast({
        title: 'Error',
        description: 'Could not add Program Day, is this day already active?',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <DatePickerFixedExcludeDays
          startDate={startDate}
          setStartDate={setStartDate}
          weekStart={programLogWeek.startDate}
          weekEnd={programLogWeek.endDate}
          highlightDates={dayDates}
        />
        <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
          Create
        </PbPrimaryButton>
      </CenterColumnFlex>
    </form>
  );
};

export default AddProgramDayForm;
