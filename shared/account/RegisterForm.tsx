import React from 'react';
import { Box, Stack } from '../../chakra/Layout';
import { SimpleGrid, useColorModeValue as mode, VisuallyHidden } from '@chakra-ui/react';
import { Button, FormControl, FormLabel, Input } from '../../chakra/Forms';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import DividerWithText from '../forms/DividerWithText';
import { PasswordField } from '../../components/account/PasswordField';
import { TextError } from '../../components/common/Texts';
import { IFormWithHeaderProps } from '../forms/FormTypes';
import { FormHeader } from '../forms/FormHeader';
import { FormButton } from '../../components/common/Buttons';
import FormBody from '../forms/FormBody';

const RegisterForm: React.FC<IFormWithHeaderProps> = ({ register, errorMessage, loading, heading, spanText, linkText, linkUrl }) => {
  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <FormHeader heading={heading} spanText={spanText} linkText={linkText} linkUrl={linkUrl} />
      <FormBody>
        <Stack spacing="6">
          <FormControl id="userName">
            <FormLabel>Username</FormLabel>
            <Input name="userName" isRequired ref={register} />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input name="email" type="email" autoComplete="email" isRequired ref={register} />
          </FormControl>
          <PasswordField ref={register} />
          {errorMessage !== '' && <TextError textAlign="center">{errorMessage}</TextError>}
          <FormButton colorScheme="blue" size="lg" fontSize="md" isLoading={loading}>
            Register
          </FormButton>
        </Stack>
        <DividerWithText mt="6">or register with</DividerWithText>
        <SimpleGrid mt="6" columns={3} spacing="3">
          <Button bg={mode('white', 'gray.700')} variant="outline">
            <VisuallyHidden>Register with Facebook</VisuallyHidden>
            <FaFacebook />
          </Button>
          <Button bg={mode('white', 'gray.700')} variant="outline">
            <VisuallyHidden>Register with Google</VisuallyHidden>
            <FaGoogle />
          </Button>
          <Button bg={mode('white', 'gray.700')} variant="outline">
            <VisuallyHidden>Register with Github</VisuallyHidden>
            <FaGithub />
          </Button>
        </SimpleGrid>
      </FormBody>
    </Box>
  );
};

export default RegisterForm;
