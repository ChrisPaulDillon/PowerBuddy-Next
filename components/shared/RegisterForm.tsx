import React from 'react';
import { BiDumbbell } from 'react-icons/bi';
import { Box, Stack, InputGroup, InputLeftElement, Select, toast, useToast } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, Input, Button, Icon } from '@chakra-ui/core';
import { validateEmailInput, validateInput, validatePassword } from '../../util/formInputs';
import { AiFillStar, AiTwotoneLock, MdEmail } from 'react-icons/all';
import { IUser } from 'powerbuddy-shared';
import axios from 'axios';
import { RegisterUserUrl } from '../../api/account/user';
import { REGISTER_USER } from '../../redux/actionTypes';
import { setAuthorizationToken } from '../../redux/util/authorization';
import { useDispatch } from 'react-redux';
import { CenterColumnFlex } from '../layout/Flexes';
import { PORTAL_URL } from '../../InternalLinks';

const RegisterForm = () => {
  const { handleSubmit, errors, register, formState } = useForm();
  const toast = useToast();
  const dispatcher = useDispatch();

  const onSubmit = async ({ username, email, password }: any) => {
    const user: IUser = {
      email: email,
      userName: username,
      password: password,
    };
    try {
      const response = await axios.post(RegisterUserUrl(), user);
      localStorage.setItem('token', response.data.token);
      setAuthorizationToken(response.data.token);
      dispatcher({
        type: REGISTER_USER,
        user: response.data.user,
        isAuthenticated: true,
      });
      toast({
        title: 'Success',
        description: 'Successfully Signed Up',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
      window.location.href = PORTAL_URL;
    } catch (error) {
      if (error?.response?.status === 409) {
        toast({
          title: 'Error',
          description: 'Username or email already in use, please try another',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  return (
    <CenterColumnFlex>
      <Box borderStyle="rd" border="1px" p="5" rounded="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl isInvalid={errors.name}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<AiFillStar />} />
                <Input name="username" placeholder="Username" ref={register({ validate: validateInput })} />
              </InputGroup>
              <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={<MdEmail />} />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  aria-describedby="email-helper-text"
                  ref={register({ validate: validateEmailInput })}
                />
              </InputGroup>
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" fontSize="1.2em" size="20px" children={<AiTwotoneLock />} />
                <Input type="password" name="password" placeholder="Password" ref={register({ validate: validatePassword })} />
              </InputGroup>
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.select}>
              <Select icon={<BiDumbbell />} name="select" placeholder="Select Sport" ref={register({ validate: validateInput })}>
                <option value="Weightlifting">Weightlifting</option>
                <option value="Powerlifting">Powerlifting</option>
              </Select>
              <FormErrorMessage>{errors.select && errors.select.message}</FormErrorMessage>
            </FormControl>

            <Button mt={4} variantColor="teal" variant="outline" isLoading={formState.isSubmitting} type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </CenterColumnFlex>
  );
};

export default RegisterForm;
