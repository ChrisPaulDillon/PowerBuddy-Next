import { FormControl, FormLabel, FormErrorMessage, useColorModeValue as mode } from '@chakra-ui/react';
import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';
import { Box } from '../../chakra/Layout';
import { FormButton } from '../../components/common/Buttons';
import { FormInput } from '../../components/common/Inputs';
import { FormLayoutFlex } from '../../components/layout/Flexes';
import { validateInput } from '../../util/formInputs';
import FormBody from '../forms/FormBody';
import { FormHeader } from '../forms/FormHeader';
import { IFormWithHeaderProps } from '../forms/FormTypes';

interface IResetPasswordFormProps extends IFormWithHeaderProps {
  errors: DeepMap<Record<string, any>, FieldError>;
}

const ResetPasswordForm: React.FC<IResetPasswordFormProps> = ({ register, errorMessage, loading, heading, spanText, linkText, linkUrl, errors }) => {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <FormHeader heading={heading} spanText={spanText} linkText={linkText} linkUrl={linkUrl} />
      <FormBody>
        <FormControl isInvalid={errors.password}>
          <FormLayoutFlex>
            <FormLabel>Password</FormLabel>
            <FormInput name="password" ref={register({ validate: validateInput })} size="sm" type="password" />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormLayoutFlex>
        </FormControl>
        <FormControl isInvalid={errors.password2}>
          <FormLayoutFlex>
            <FormLabel>Confirm Password</FormLabel>
            <FormInput name="password2" ref={register({ validate: validateInput })} size="sm" type="password" />
            <FormErrorMessage>{errors.password2 && errors.password2.message}</FormErrorMessage>
          </FormLayoutFlex>
        </FormControl>
        <FormButton isLoading={loading}>Comfirm</FormButton>
      </FormBody>
    </Box>
  );
};

export default ResetPasswordForm;
