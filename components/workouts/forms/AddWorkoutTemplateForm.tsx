import { Box, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import { IWorkoutDay, IWorkoutTemplate } from 'powerbuddy-shared/lib';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CreateWorkoutTemplateRequest } from '../../../apiCalls/Area/account/workoutTemplate';
import useLoadExercises from '../../../hooks/redux/useLoadExercises';
import WorkoutDay from '../../../pages/workoutdiary/[workoutDayId]';
import { validateInput } from '../../../util/formInputs';
import { PbPrimaryButton } from '../../common/Buttons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
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
        <Box p={2}>
          <FormInput name="templateName" ref={register({ validate: validateInput })} w="100%" />
          <FormErrorMessage>{errors.templateName && errors.templateName.message}</FormErrorMessage>
        </Box>
      </FormControl>
      <Box p={2}>
        <TextXs textAlign="center">Save this workout as a template to be used in future workouts</TextXs>
      </Box>
      <CenterColumnFlex pt="3">
        <Box mt="5">
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            Add Template
          </PbPrimaryButton>
        </Box>
        <Box mt={5}>
          <TextXs>Note: You cannot have two workout templates with the same name</TextXs>
        </Box>
      </CenterColumnFlex>
    </form>
  );
};

export default AddWorkoutTemplateForm;
