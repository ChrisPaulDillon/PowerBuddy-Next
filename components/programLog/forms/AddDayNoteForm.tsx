import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormErrorMessage, FormControl, Box, useToast } from '@chakra-ui/core';
import { CenterColumnFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import { useProgramLogContext } from '../ProgramLogContext';
import axios from 'axios';
import { UpdateProgramLogDayNotesUrl } from '../../../api/account/programLogDay';

interface IProps {
  onClose: () => void;
  programLogDayId: number;
  note: string | undefined;
}

const AddDayNoteAlert: React.FC<IProps> = ({ note, programLogDayId, onClose }) => {
  const [loading] = useState<boolean>(false);
  const { UpdateDayNotes } = useProgramLogContext();
  const toast = useToast();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async ({ notes }: any) => {
    try {
      await axios.post(UpdateProgramLogDayNotesUrl(programLogDayId), notes);
      UpdateDayNotes(programLogDayId, notes);
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
          <Button colorScheme="green" type="submit" ml={3} isLoading={loading}>
            Add
          </Button>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default AddDayNoteAlert;
