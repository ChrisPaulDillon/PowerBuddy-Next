import { useToast } from '@chakra-ui/react';
import { IWorkoutDay, IWorkoutTemplate } from 'powerbuddy-shared/lib';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateWorkoutTemplateRequest } from '../../../api/account/workoutTemplate';
import { FormControl, FormErrorMessage } from '../../../chakra/Forms';
import { Box } from '../../../chakra/Layout';
import useLoadExercises from '../../../hooks/redux/useLoadExercises';
import { validateInput } from '../../../util/formInputs';
import { FormButton } from '../../common/Buttons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { FormLayoutFlex } from '../../layout/Flexes';
import { ToastSuccess } from '../../shared/Toasts';
import { useUserContext } from '../../users/UserContext';

interface IProps {
  onClose: () => void;
  workoutDay: IWorkoutDay;
}

const AddWorkoutTemplateForm: React.FC<IProps> = ({ onClose, workoutDay }) => {
  useLoadExercises();
  const toast = useToast();

  const { userId } = useUserContext();

  const onSubmit = async ({ templateName }: any) => {
    const workoutTemplate: IWorkoutTemplate = {
      workoutName: templateName,
      workoutTemplateId: 0,
      dateCreated: new Date(),
      userId: userId,
      workoutExercises: workoutDay?.workoutExercises,
    };
    const response = await CreateWorkoutTemplateRequest(workoutTemplate);
    if (response?.code) {
      // switch (response?.code) {
      //   case EMAIL_NOT_CONFIRMED:
      //     setEmailNotVerified(true);
      //     setUserId(response?.message);
      //     break;
      // }
    } else {
      toast(ToastSuccess('Success', 'Workout Template has been added'));
    }
  };

  const { register, handleSubmit, errors, formState } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.templateName}>
        <FormLayoutFlex>
          <FormInput name="templateName" ref={register({ validate: validateInput })} w="100%" />
          <FormErrorMessage>{errors.templateName && errors.templateName.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      <FormLayoutFlex>
        <TextXs textAlign="center">Save this workout as a template to be used in future workouts</TextXs>
      </FormLayoutFlex>
      <FormButton isLoading={formState.isSubmitting}>Add Template</FormButton>
      <Box mt={5}>
        <TextXs textAlign="center">Note: You cannot have two workout templates with the same name</TextXs>
      </Box>
    </form>
  );
};

export default AddWorkoutTemplateForm;
