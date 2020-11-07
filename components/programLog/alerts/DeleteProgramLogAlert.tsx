//@ts-nocheck
import React, { useState } from 'react';
import { Button, Box } from '@chakra-ui/core';
import { ToastPositionEnum, ToastTypeEnum, useFireToast } from '../../../hooks/useFireToast';
import { deleteProgramLogAsync } from '../../../redux/area/account/programLogActions';
import { TextSm } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { useProgramLogContext } from '../ProgramLogContext';

interface IProps {
  onClose: () => void;
  programLogId: numnber;
}

const DeleteProgramLogAlert: React.FC<IProps> = ({ onClose, programLogId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  useFireToast(success, 'Successfully delete log', ToastTypeEnum.Success, ToastPositionEnum.Top);
  useFireToast(error, 'Could not delete log, something has went wrong!', ToastTypeEnum.Error, ToastPositionEnum.Top);
  const { DeleteLog } = useProgramLogContext();

  const deleteLog = async () => {
    setLoading(true);
    await deleteProgramLogAsync({ programLogId, DeleteLog, setLoading, setError, setSuccess, onClose });
    setLoading(false);
    onClose();
  };

  return (
    <Box>
      <CenterColumnFlex>
        <TextSm></TextSm>
        <Button mt="4" colorScheme="red" onClick={() => deleteLog()} ml={3} isLoading={loading}>
          Delete
        </Button>
      </CenterColumnFlex>
    </Box>
  );
};

export default DeleteProgramLogAlert;
