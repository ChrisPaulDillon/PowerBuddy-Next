import React from 'react';
import { Box, Stack } from '../../../chakra/Layout';
import { SimpleGrid, useColorModeValue as mode, VisuallyHidden } from '@chakra-ui/react';
import { Text, Heading } from '../../../chakra/Typography';
import { Button, FormControl, FormLabel, Input } from '../../../chakra/Forms';
import { FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa';
import DividerWithText from '../../../components/layout/DividerWithText';
import { PasswordField } from '../../../components/account/PasswordField';
import { TextError } from '../../common/Texts';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { LOGIN_URL } from '../../../InternalLinks';

interface IRegisterFormProps {
  register: any;
  errorMessage: string;
  loading: boolean;
}

const NewRegisterForm: React.FC<IRegisterFormProps> = ({ register, errorMessage, loading }) => {
  const router = useRouter();

  return (
    <Box bg={mode('gray.50', 'inherit')} minH="100vh" py="12" px={{ sm: '6', lg: '8' }}>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
        <Box mb={{ base: '10', md: '28' }}></Box>
        <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
          Register
        </Heading>
        <Text mt="4" align="center" maxW="md" fontWeight="medium">
          <span>Already have an account?</span>
          <Box as="a" marginStart="1" color={mode('blue.600', 'blue.200')} _hover={{ color: 'blue.600' }} display={{ base: 'block', sm: 'revert' }}>
            <Link href={LOGIN_URL}>Login</Link>
          </Box>
        </Text>
      </Box>
      <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} mt="8" w={{ sm: 'full' }}>
        <Box bg={mode('white', 'gray.700')} py="8" px={{ base: '4', md: '10' }} shadow="base" rounded={{ sm: 'lg' }}>
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
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md" isLoading={loading}>
              Sign in
            </Button>
          </Stack>
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SimpleGrid mt="6" columns={3} spacing="3">
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Register with Facebook</VisuallyHidden>
              <FaFacebook />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Register with Google</VisuallyHidden>
              <FaGoogle />
            </Button>
            <Button color="currentColor" variant="outline">
              <VisuallyHidden>Register with Github</VisuallyHidden>
              <FaGithub />
            </Button>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default NewRegisterForm;
