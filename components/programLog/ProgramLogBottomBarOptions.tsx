import { Box, useDisclosure, useToast } from '@chakra-ui/core';
import React, { useState } from 'react';
import { FcCalendar } from 'react-icons/fc';
import { MdWarning } from 'react-icons/md';
import { IProgramLog } from '../../interfaces/programLogs';
import { PbMenuButton } from '../common/Buttons';
import { useProgramLogContext } from './ProgramLogContext';
import axios from 'axios';
import { AddProgramLogWeekToLogUrl } from '../../api/account/programLogWeek';
import { PbModalDrawer, PbModalDrawerForm } from '../common/ModalDrawer';
import { DeleteProgramLogDayUrl } from '../../api/account/programLogDay';
import { DeleteProgramLogUrl } from '../../api/account/programLog';

interface IProps {
  programLog: IProgramLog;
  isOpen: boolean;
  onClose: () => void;
}

const ProgramLogBottomBarOptions: React.FC<IProps> = ({ programLog, isOpen, onClose }) => {
  const { AddWeek, DeleteLog } = useProgramLogContext();
  const toast = useToast();
  const [addLogLoading, setAddLogLoading] = useState<boolean>(false);
  const [deleteLogLoading, setDeleteLogLoading] = useState<boolean>(false);
  const { isOpen: isDeleteLogOpen, onOpen: onDeleteLogOpen, onClose: onDeleteLogClose } = useDisclosure();

  const addProgramWeek = async () => {
    setAddLogLoading(true);
    try {
      const result = await axios.post(AddProgramLogWeekToLogUrl(programLog.programLogId!));
      AddWeek(result.data);
      toast({
        title: 'Success',
        description: 'Successfully added new week',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not add week, please try again later!',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setAddLogLoading(false);
    onClose();
  };

  const deleteLog = async () => {
    setDeleteLogLoading(true);
    try {
      await axios.delete(DeleteProgramLogUrl(programLog.programLogId!));
      DeleteLog();
      toast({
        title: 'Success',
        description: 'Successfully deleted program log',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not delete log, please try again later',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setDeleteLogLoading(false);
    onDeleteLogClose();
    onClose();
  };

  return (
    <Box>
      <PbModalDrawerForm title="Diary Options" isOpen={isOpen} onClose={onClose}>
        <PbMenuButton Icon={FcCalendar} onClick={() => addProgramWeek()} loading={addLogLoading}>
          Add New Week
        </PbMenuButton>
        <PbMenuButton
          Icon={MdWarning}
          onClick={() => {
            onDeleteLogOpen();
            onClose();
          }}
          loading={deleteLogLoading}>
          Delete Log
        </PbMenuButton>
      </PbModalDrawerForm>
      <PbModalDrawer
        title="Delete Diary Log?"
        isOpen={isDeleteLogOpen}
        body="Are you sure? This cannot be undone"
        onClose={onDeleteLogClose}
        onClick={() => deleteLog()}
        actionText="DELETE"
      />
    </Box>
  );
};

export default ProgramLogBottomBarOptions;
