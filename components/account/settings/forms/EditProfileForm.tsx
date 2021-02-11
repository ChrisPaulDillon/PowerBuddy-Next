import React, { useState } from 'react';
import { Checkbox, Radio, RadioGroup, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CenterColumnFlex } from '../../../layout/Flexes';
import { PrimaryButton } from '../../../common/Buttons';
import { TextXs } from '../../../common/Texts';
import { PbStack } from '../../../common/Stacks';
import { FormInput, FormNumberInput } from '../../../common/Inputs';
import axios from 'axios';
import { EditProfileUrl } from '../../../../api/account/user';
import { IUser } from 'powerbuddy-shared/lib';
import { ToastError, ToastSuccess } from '../../../shared/Toasts';
import { withAuthorized } from '../../../../util/authMiddleware';
import { Box } from '../../../../chakra/Layout';

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

  const { handleSubmit, formState, register } = useForm();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex mt="4">
        <Box m="1">
          <PbStack>
            <TextXs pt="3" pr="1" minW="80px">
              First Name
            </TextXs>
            <FormInput name="firstName" defaultValue={user?.firstName} ref={register} size="sm" />
          </PbStack>
        </Box>
        <Box m="1">
          <PbStack>
            <TextXs pt="3" pr="1" minW="80px">
              Last Name
            </TextXs>
            <FormInput name="lastName" defaultValue={user?.lastName} ref={register} size="sm" />
          </PbStack>
        </Box>
        <Box m="1">
          <PbStack>
            <TextXs pt="3" pr="1" minW="80px">
              Weight
            </TextXs>
            <FormNumberInput name="weight" defaultValue={user?.bodyWeight} ref={register} onChange={(e) => updateBodyWeight(e)} size="sm" />
          </PbStack>
        </Box>
        <Box m="1" mt="2">
          <PbStack>
            <TextXs>Quotes Enabled?</TextXs>
            <Checkbox name="quotesEnabled" color="green.500" defaultIsChecked={user?.quotesEnabled} ref={register} />
          </PbStack>
        </Box>
        <Box m="1" mt={1}>
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
        </Box>
        <CenterColumnFlex mt={3}>
          <PrimaryButton type="submit" loading={formState.isSubmitting}>
            Update
          </PrimaryButton>
        </CenterColumnFlex>
      </CenterColumnFlex>
    </form>
  );
};

export default withAuthorized(EditProfileForm);
