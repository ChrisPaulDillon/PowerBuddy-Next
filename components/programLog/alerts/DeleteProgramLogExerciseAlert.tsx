import React, { useState } from 'react';
import { Button, Box } from '@chakra-ui/core';
import { deleteProgramLogExerciseAsync } from '../../../redux/area/account/programLogExerciseActions';
import { TextSm } from '../../common/Texts';
import { CenterColumnFlex } from './../../layout/Flexes';
import { useProgramLogContext } from '../ProgramLogContext';

interface IProps {
  onClose: () => void;
  programLogDayId: number;
  programLogExerciseId: number;
}

const DeleteProgramLogExerciseAlert: React.FC<IProps> = ({ onClose, programLogDayId, programLogExerciseId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { DeleteExercise } = useProgramLogContext();

  const deleteExercise = async () => {
    setLoading(true);
    await deleteProgramLogExerciseAsync({
      programLogExerciseId,
      programLogDayId,
      DeleteExercise,
      setError,
      setSuccess,
    });
    setLoading(false);
    onClose();
  };

  return (
    <Box>
      <CenterColumnFlex>
        <TextSm>Are you sure? This cannot be undone</TextSm>
        <Button mt="4" colorScheme="red" onClick={async () => await deleteExercise()} ml={3} isLoading={loading}>
          Delete
        </Button>
      </CenterColumnFlex>
    </Box>
  );
};

export default DeleteProgramLogExerciseAlert;
