import React from 'react';
import { Box, Stack } from '../../../chakra/Layout';
import { useColorModeValue as mode } from '@chakra-ui/react';
import { FormControl, FormLabel, Input } from '../../../chakra/Forms';
import { TextError } from '../../common/Texts';
import { IFormProps } from '../../forms/Forms';
import { FormHeader } from '../../forms/FormHeader';
import { LOGIN_URL } from '../../../InternalLinks';
import { FormButton } from '../../common/Buttons';

const ForgotPasswordForm: React.FC<IFormProps> = ({ register, errorMessage, loading }) => {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <FormHeader heading="Register your password" spanText="Already know your password?" linkText="Login" linkUrl={LOGIN_URL} />
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Box bg={mode('white', 'gray.700')} py="8" px={{ base: '4', md: '10' }} shadow="base" rounded={{ sm: 'lg' }}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
