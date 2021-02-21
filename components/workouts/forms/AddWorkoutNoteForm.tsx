import React from 'react';
import { FormLayoutFlex } from '../../layout/Flexes';
import { validateInput } from '../../../util/formInputs';
import { FormInput } from '../../common/Inputs';
import { FormButton } from '../../common/Buttons';
import { IFormProps } from '../../../shared/forms/FormTypes';
import { Box } from '../../../chakra/Layout';

interface IAddWorkoutNoteFormProps extends IFormProps {
  note: string | undefined;
}

const AddWorkoutNoteForm: React.FC<IAddWorkoutNoteFormProps> = ({ register, loading, note }) => {
  return (
    <Box>
      <FormLayoutFlex>
        <FormInput ref={register({ validate: validateInput })} name="note" defaultValue={note} isRequired />
      </FormLayoutFlex>
      <FormButton isLoading={loading}>Add</FormButton>
    </Box>
  );
};

export default AddWorkoutNoteForm;
