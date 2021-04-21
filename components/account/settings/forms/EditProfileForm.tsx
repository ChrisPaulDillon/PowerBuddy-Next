import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FormLayoutFlex } from '../../../layout/Flexes';
import { FormButton } from '../../../common/Buttons';
import { TextXs } from '../../../common/Texts';
import { FormStack } from '../../../common/Stacks';
import { FormInput, FormNumberInput } from '../../../common/Inputs';
import axios from 'axios';
import { EditProfileUrl } from '../../../../api/account/user';
import { IUser } from 'powerbuddy-shared/lib';
import { withAuthorized } from '../../../../util/authMiddleware';
import { Checkbox, FormControl, FormErrorMessage, FormLabel } from '../../../../chakra/Forms';
import { validateInput } from '../../../../util/formInputs';
import { useUserContext } from '../../../users/UserContext';
import useFireToast from '../../../../hooks/useFireToast';

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
  const [bodyWeight, setBodyWeight] = useState<number>(user?.bodyWeight);
  const [usingMetric, setUsingMetric] = useState(user?.usingMetric ? '1' : '2');

  const { kgOrLbs } = useUserContext();

  const toast = useFireToast();

  useEffect(() => {
    if (user?.usingMetric) {
      setUsingMetric(user?.usingMetric ? '1' : '2');
    }
  }, [user?.usingMetric]);

  useEffect(() => {
    if (user?.bodyWeight) {
      setBodyWeight(user?.bodyWeight);
    }
  }, [user?.bodyWeight]);

  const updateBodyWeight = (e) => {
    if (e) {
      setBodyWeight(e);
    }
  };

  const onSubmit = async ({ firstName, lastName, quotesEnabled }: any) => {
    const profile: IEditProfile = {
      userId: user?.userId,
      firstName: firstName,
      lastName: lastName,
      quotesEnabled: quotesEnabled,
      bodyWeight: bodyWeight,
      usingMetric: usingMetric === '1' ? true : false,
    };

    try {
      const response = await axios.put(EditProfileUrl(), profile);
      if (response && response.data) {
        toast.Success('Successfully Updated Profile');
      }
    } catch (error) {
      toast.Error('Profile Could Not Be Updated');
    }
  };

  const { handleSubmit, formState, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.firstName}>
        <FormLayoutFlex>
          <FormLabel>First Name</FormLabel>
          <FormInput name="firstName" defaultValue={user?.firstName} ref={register({ validate: validateInput })} size="sm" />
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>

      <FormControl isInvalid={errors.lastName}>
        <FormLayoutFlex>
          <FormLabel>Last Name</FormLabel>
          <FormInput name="lastName" defaultValue={user?.lastName} ref={register({ validate: validateInput })} size="sm" />
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>

      <FormControl isInvalid={errors.weight}>
        <FormLayoutFlex>
          <FormLabel>Weight ({kgOrLbs})</FormLabel>
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
        <FormStack>
          <FormLabel>Quotes Enabled</FormLabel>
          <Checkbox name="quotesEnabled" color="green.500" defaultIsChecked={user?.quotesEnabled} ref={register} />
        </FormStack>
      </FormControl>

      <RadioGroup onChange={(e) => setUsingMetric(e.toString())} value={usingMetric}>
        <FormStack mt={5}>
          <Radio value="1">
            <TextXs mr={2}>Metric</TextXs>
          </Radio>
          <Radio value="2">
            <TextXs>Pounds</TextXs>
          </Radio>
        </FormStack>
      </RadioGroup>
      <FormButton isLoading={formState.isSubmitting}>Update</FormButton>
    </form>
  );
};

export default withAuthorized(EditProfileForm);
