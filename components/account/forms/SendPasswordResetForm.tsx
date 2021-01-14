import { Box, Flex, FormControl, FormErrorMessage, useToast } from '@chakra-ui/core';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdAccountBox } from 'react-icons/md';
import { TiArrowBack } from 'react-icons/ti';
import { SendPasswordResetUrl } from '../../../api/public/user';
import { setAuthorizationToken } from '../../../redux/util/authorization';
import { validateEmailInput } from '../../../util/formInputs';
import { PbPrimaryButton } from '../../common/Buttons';
import PbIconButton from '../../common/IconButtons';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { LoginStateEnum } from '../factories/LoginFormFactory';

const SendPasswordResetForm = ({ onClose, setLoginState }) => {
  const toast = useToast();
  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async ({ email }: any) => {
    try {
      const response = await axios.post(SendPasswordResetUrl(email));
    } catch (error) {}
    toast({
      title: 'Success',
      description: 'If an account with the associated email exists, a reset password email has been sent',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
    setLoginState(LoginStateEnum.Login);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex>
        <PbIconButton Icon={TiArrowBack} onClick={() => setLoginState(LoginStateEnum.Login)} label="Return to Login" />
        <Box p="2">
          <FormControl isInvalid={errors.email}>
            <Box p="1">
              <TextXs>Email Address</TextXs>
              <FormInput name="email" ref={register({ validate: validateEmailInput })} placeholder="example@examplesite.com" />
            </Box>
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>
        </Box>
        <Flex mt="3" justifyContent="center">
          <PbPrimaryButton type="submit" leftIcon={<MdAccountBox />} loading={formState.isSubmitting}>
            Submit
          </PbPrimaryButton>
        </Flex>
      </CenterColumnFlex>
    </form>
  );
};

export default SendPasswordResetForm;