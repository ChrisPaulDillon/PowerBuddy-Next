import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormControl, Box, useToast } from '@chakra-ui/core';
import { CenterColumnFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import { useProgramLogContext } from '../ProgramLogContext';
import axios from 'axios';
import { UpdateProgramLogDayNotesUrl } from '../../../api/account/programLogDay';
import { UpdateWorkoutNoteUrl } from '../../../api/account/workoutDay';
import { useWorkoutContext } from '../../workouts/WorkoutContext';

interface IProps {
  onClose: () => void;
  workoutDayId: number;
  note: string | undefined;
}

const AddWorkoutNoteForm: React.FC<IProps> = ({ note, workoutDayId, onClose }) => {
  const { UpdateDayNotes } = useWorkoutContext();
  const toast = useToast();

  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.put(UpdateWorkoutNoteUrl(workoutDayId, notes));
      UpdateDayNotes(notes);
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
      <CenterColumnFlex p="1" mt="1" justifyContent="center">
        <FormControl isInvalid={errors.notes}>
          <FormInput ref={register({ validate: validateInput })} name="notes" defaultValue={note} />
          <FormErrorMessage>{errors.notes && errors.notes.message}</FormErrorMessage>
        </FormControl>
        <Box mt="3">
          <Button colorScheme="green" type="submit" ml={3} isLoading={formState.isSubmitting}>
            Add
          </Button>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default AddWorkoutNoteForm;
