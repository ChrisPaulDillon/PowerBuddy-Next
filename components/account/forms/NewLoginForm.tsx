import React from 'react';
import { Box, Stack } from '../../../chakra/Layout';
import { SimpleGrid, useColorModeValue as mode, VisuallyHidden } from '@chakra-ui/react';
import { Button, FormControl, FormLabel, Input } from '../../../chakra/Forms';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import DividerWithText from '../../../components/layout/DividerWithText';
import { PasswordField } from '../../../components/account/PasswordField';
import { TextError } from '../../common/Texts';
import { REGISTER_URL } from '../../../InternalLinks';
import { IFormProps } from '../../forms/Forms';
import { FormHeader } from '../../forms/FormHeader';

const NewLoginForm: React.FC<IFormProps> = ({ register, errorMessage, loading }) => {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <FormHeader heading="Sign in to your account" spanText="Don't have an account?" linkText="Register" linkUrl={REGISTER_URL} />
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Box bg={mode('white', 'gray.700')} py="8" px={{ base: '4', md: '10' }} shadow="base" rounded={{ sm: 'lg' }}>
          <Stack spacing="6">
            <FormControl id="email">
              <FormLabel>Email or Username</FormLabel>
              <Input name="email" autoComplete="email" isRequired ref={register} />
            </FormControl>
            <PasswordField ref={register} />
            {errorMessage !== '' && <TextError textAlign="center">{errorMessage}</TextError>}
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={loading}>
              Sign in
            </Button>
          </Stack>
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={3} spacing="3">
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Login with Github</VisuallyHidden>
              <FaGithub />
            </Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default NewLoginForm;
