import React from 'react';
import { Box, Stack } from '../../chakra/Layout';
import { useColorModeValue as mode } from '@chakra-ui/react';
import { FormControl, FormLabel, Input } from '../../chakra/Forms';
import { TextError } from '../../components/common/Texts';
import { IFormWithHeaderProps } from '../forms/FormTypes';
import { FormHeader } from '../forms/FormHeader';
import { FormButton } from '../../components/common/Buttons';
import FormBody from '../forms/FormBody';

const ForgotPasswordForm: React.FC<IFormWithHeaderProps> = ({ register, errorMessage, loading, heading, spanText, linkText, linkUrl }) => {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <FormHeader heading={heading} spanText={spanText} linkText={linkText} linkUrl={linkUrl} />
      <FormBody>
        <Stack spacing="6">
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input name="email" type="email" autoComplete="email" isRequired ref={register} />
          </FormControl>
          {errorMessage !== '' && <TextError textAlign="center">{errorMessage}</TextError>}
          <FormButton type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={loading}>
            Reset
          </FormButton>
        </Stack>
      </FormBody>
    </Box>
  );
};

export default ForgotPasswordForm;
