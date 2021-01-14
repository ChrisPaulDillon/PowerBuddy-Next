import { Box, Checkbox, Flex, useToast } from '@chakra-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ChangePasswordUrl } from '../../../api/account/user';
import { PbPrimaryButton } from '../../common/Buttons';
import { FormInput, FormNumberInput } from '../../common/Inputs';
import { PbStack } from '../../common/Stacks';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';

interface IChangePasswordBody {
  token: string;
  password: string;
}

interface IChangePasswordFormProps {
  userId: string;
  token: string;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({ userId, token }) => {
  const toast = useToast();
  const { handleSubmit, formState, register } = useForm();

  const onSubmit = async ({ password }: any) => {
    try {
      const changePasswordBody: IChangePasswordBody = {
        token: token.replace(/\s+/g, '+'),
        password: password,
      };
      const response = await axios.post(ChangePasswordUrl(userId as string), changePasswordBody);
      if (response && response.data) {
        toast({
          title: 'Success',
          description: 'Password Successfully Changed',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Password not changed, token has expired',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Password not changed, token has expired',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex mt={2}>
        <Box m="1">
          <Flex flexDir="column">
            <TextXs pt="3">Password</TextXs>
            <FormInput name="password" ref={register} size="sm" type="password" />
          </Flex>
        </Box>
        <Box m="1">
          <Flex flexDir="column">
            <TextXs pt="3">Confirm Password</TextXs>
            <FormInput name="password2" ref={register} size="sm" type="password" />
          </Flex>
        </Box>
        <CenterColumnFlex pt={4}>
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            Comfirm
          </PbPrimaryButton>
        </CenterColumnFlex>
      </CenterColumnFlex>
    </form>
  );
};

export default ChangePasswordForm;
