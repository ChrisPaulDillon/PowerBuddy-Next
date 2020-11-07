import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormControl, useToast } from '@chakra-ui/core';
import { CenterColumnFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import { useProgramLogContext } from '../ProgramLogContext';
import { UpdateProgramLogExerciseNotesUrl } from '../../../api/account/programLogExercise';
import axios from 'axios';

interface IProps {
  onClose: () => void;
  programLogExerciseId: number;
  programLogDayId: number;
  note: string | undefined;
}

const AddExerciseNoteForm: React.FC<IProps> = ({ onClose, programLogExerciseId, programLogDayId, note }) => {
  const { UpdateExerciseNotes } = useProgramLogContext();
  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.post(UpdateProgramLogExerciseNotesUrl(programLogExerciseId, notes));
      UpdateExerciseNotes(programLogExerciseId, programLogDayId, notes);
      toast({
        title: 'Success',
        description: 'Successfully added notes',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (ex) {
      toast({
        title: 'Error',
        description: 'Could not add notes',
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
        <FormControl isInvalid={errors.notes}>
          <FormInput ref={register({ validate: validateInput })} name="notes" defaultValue={note} />
          <FormErrorMessage>{errors.notes && errors.notes.message}</FormErrorMessage>
        </FormControl>
        <Button colorScheme="green" type="submit" ml={3} isLoading={formState.isSubmitting} mt="4">
          Add
        </Button>
      </CenterColumnFlex>
    </form>
  );
};

export default AddExerciseNoteForm;
