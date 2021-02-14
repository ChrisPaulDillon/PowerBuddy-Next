import React, { forwardRef } from 'react';
import { InputProps, NumberInputProps } from '@chakra-ui/react';
import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '../../chakra/Forms';
import { Stack } from '../../chakra/Layout';

interface IFormInputProps extends InputProps {
  ref?: any;
}

interface IFormNumberInputProps extends NumberInputProps {
  ref?: any;
  onChange: any;
}

export const FormInput: React.FC<IFormInputProps> = forwardRef(({ ...rest }, ref: any) => <Input ref={ref} {...rest} />);

export const FormNumberInput: React.FC<IFormNumberInputProps> = forwardRef(({ ...rest }, ref: any) => (
  <NumberInput ref={ref} {...rest}>
    {' '}
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
));

export const FormWeightInput: React.FC<IFormNumberInputProps> = forwardRef(({ ...rest }, ref: any) => (
  <NumberInput ref={ref} step={0.25} {...rest}>
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
));

export const EmailInput: React.FC<IFormInputProps> = forwardRef(({ ...rest }, ref: any) => {
  return (
    <Stack spacing={4}>
      <InputGroup size="md" w="100%" p="2">
        <InputLeftElement children={<Icon name="phone" color="gray.300" />} />
        <Input type="email" placeholder="Enter Email" ref={ref} {...rest} />
      </InputGroup>
    </Stack>
  );
});

export const PasswordInput: React.FC<IFormInputProps> = forwardRef(({ ...rest }, ref: any) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md" w="100%" p="2">
      <InputLeftElement children={<Icon name="phone" color="gray.300" />} />
      <Input type={show ? 'text' : 'password'} placeholder="Enter password" ref={ref} {...rest} />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
