import React, { useState } from 'react';
import { Box, Checkbox, Flex, useToast } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { CenterColumnFlex } from '../../layout/Flexes';
import { PbPrimaryButton } from '../../common/Buttons';
import { TextXs } from '../../common/Texts';
import { PbStack } from '../../common/Stacks';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../redux/store';
import { FormInput, FormNumberInput } from '../../common/Inputs';
import axios from 'axios';
import { EditProfileUrl } from '../../../api/account/user';

interface IEditProfile {
  userId: string;
  firstName: string;
  lastName: string;
  bodyWeight: number;
  quotesEnabled: boolean;
}

const UserSettingsForm = () => {
  const { user } = useSelector((state: IAppState) => state.state);
  const [bodyWeight, setBodyWeight] = useState<number>(user.bodyWeight!);
  const toast = useToast();

  const updateBodyWeight = (e) => {
    if (e) {
      setBodyWeight(e);
    }
  };

  const { handleSubmit, formState, register } = useForm();

  const onSubmit = async ({ firstName, lastName, quotesEnabled }: any) => {
    const profile: IEditProfile = {
      userId: user.userId!,
      firstName: firstName,
      lastName: lastName,
      quotesEnabled: quotesEnabled,
      bodyWeight: bodyWeight,
    };

    try {
      const response = await axios.put(EditProfileUrl(), profile);
      if (response && response.data) {
        toast({
          title: 'Success',
          description: 'Successfully Updated Profile',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Profile Could Not Be Updated',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {user.userSetting != null ? (
        <CenterColumnFlex mt="4">
          <Box m="1">
            <PbStack>
              <TextXs pt="3" pr="1" minW="80px">
                First Name
              </TextXs>
              <FormInput name="firstName" defaultValue={user!.firstName!} ref={register} size="sm" />
            </PbStack>
          </Box>
          <Box m="1">
            <PbStack>
              <TextXs pt="3" pr="1" minW="80px">
                Last Name
              </TextXs>
              <FormInput name="lastName" defaultValue={user!.lastName!} ref={register} size="sm" />
            </PbStack>
          </Box>
          <Box m="1">
            <PbStack>
              <TextXs pt="3" pr="1" minW="80px">
                Weight
              </TextXs>
              <FormNumberInput name="weight" defaultValue={user!.bodyWeight!} ref={register} onChange={(e) => updateBodyWeight(e)} size="sm" />
            </PbStack>
          </Box>
          <Box m="1" mt="2">
            <PbStack>
              <TextXs>Quotes Enabled?</TextXs>
              <Checkbox name="quotesEnabled" color="green.500" defaultIsChecked={user.quotesEnabled} ref={register} />
            </PbStack>
          </Box>
          <CenterColumnFlex mt="4">
            <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
              Update
            </PbPrimaryButton>
          </CenterColumnFlex>
        </CenterColumnFlex>
      ) : null}
    </form>
  );
};

export default UserSettingsForm;
