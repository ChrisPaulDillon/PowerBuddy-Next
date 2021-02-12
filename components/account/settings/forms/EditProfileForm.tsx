import React, { useState } from 'react';
import { Checkbox, Radio, RadioGroup, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormLayoutFlex } from '../../../layout/Flexes';
import { FormButton } from '../../../common/Buttons';
import { TextXs } from '../../../common/Texts';
import { PbStack } from '../../../common/Stacks';
import { FormInput, FormNumberInput } from '../../../common/Inputs';
import axios from 'axios';
import { EditProfileUrl } from '../../../../api/account/user';
import { IUser } from 'powerbuddy-shared/lib';
import { ToastError, ToastSuccess } from '../../../shared/Toasts';
import { withAuthorized } from '../../../../util/authMiddleware';
import { FormControl, FormErrorMessage, FormLabel } from '../../../../chakra/Forms';
import { validateInput } from '../../../../util/formInputs';

interface IEditProfile {
  userId: string;
  firstName: string;
  lastName: string;
  bodyWeight: number;
  quotesEnabled: boolean;
  usingMetric: boolean;
}

interface IProps {
  user: IUser;
}

const EditProfileForm: React.FC<IProps> = ({ user }) => {
  const [bodyWeight, setBodyWeight] = useState<number>(user?.bodyWeight!);
  const [usingMetric, setUsingMetric] = useState(user?.usingMetric ? '1' : '2');

  const toast = useToast();

  const updateBodyWeight = (e) => {
    if (e) {
      setBodyWeight(e);
    }
  };

  const onSubmit = async ({ firstName, lastName, quotesEnabled }: any) => {
    const profile: IEditProfile = {
      userId: user?.userId!,
      firstName: firstName,
      lastName: lastName,
      quotesEnabled: quotesEnabled,
      bodyWeight: bodyWeight,
      usingMetric: usingMetric === '1' ? true : false,
    };

    try {
      const response = await axios.put(EditProfileUrl(), profile);
      if (response && response.data) {
        toast(ToastSuccess('Success', 'Successfully Updated Profile'));
      }
    } catch (error) {
      toast(ToastError('Error', 'Profile Could Not Be Updated'));
    }
  };

  const { handleSubmit, formState, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.firstName}>
        <FormLayoutFlex>
          <FormLabel minW="80px">First Name</FormLabel>
          <FormInput name="firstName" defaultValue={user?.firstName} ref={register({ validate: validateInput })} size="sm" />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>

      <FormControl isInvalid={errors.lastName}>
        <FormLayoutFlex>
          <FormLabel minW="80px">Last Name</FormLabel>
          <FormInput name="lastName" defaultValue={user?.lastName} ref={register({ validate: validateInput })} size="sm" />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>

      <FormControl isInvalid={errors.weight}>
        <FormLayoutFlex>
          <FormLabel minW="80px">Weight</FormLabel>
          <FormNumberInput
            name="weight"
            defaultValue={user?.bodyWeight}
            ref={register({ validate: validateInput })}
            onChange={(e) => updateBodyWeight(e)}
            size="sm"
          />
          <FormErrorMessage>{errors.weight && errors.weight.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>

      <FormControl>
        <FormLayoutFlex>
          <FormLabel minW="80px">Quotes Enabled?</FormLabel>
          <Checkbox name="quotesEnabled" color="green.500" defaultIsChecked={user?.quotesEnabled} ref={register} />
        </FormLayoutFlex>
      </FormControl>

      <RadioGroup onChange={(e) => setUsingMetric(e.toString())} value={usingMetric}>
        <PbStack>
          <Radio value="1">
            <TextXs mr={2}>Metric</TextXs>
          </Radio>
          <Radio value="2">
            <TextXs>Pounds</TextXs>
          </Radio>
        </PbStack>
      </RadioGroup>
      <FormButton isLoading={formState.isSubmitting}>Update</FormButton>
    </form>
  );
};

export default withAuthorized(EditProfileForm);
