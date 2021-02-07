import React, { forwardRef } from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  InputLeftElement,
  Icon,
  Stack,
  NumberInput,
  BoxProps,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from '@chakra-ui/react';

interface IProps extends BoxProps {
  name?: string;
  ref?: any;
  placeholder?: string;
  onChange?: any;
  value?: any;
  w?: any;
  type?: string;
  defaultValue?: any;
  min?: any;
  max?: any;
  size?: any;
  pr?: any;
  maxW?: any;
}

export const FormInput: React.FC<IProps> = forwardRef(
  ({ name, placeholder, onChange, value, w, type, size, pr, maxW, defaultValue }, ref, ...rest: any) => (
    <Input
      name={name}
      ref={ref}
      placeholder={placeholder}
      size={size ?? 'md'}
      onChange={onChange}
      value={value}
      w={w}
      type={type}
      variant="flushed"
      pr={pr}
      maxW={maxW}
      defaultValue={defaultValue}
      borderColor="blue.300"
      {...rest}
    />
  )
);

export const FormNumberInput: React.FC<IProps> = forwardRef(({ name, placeholder, onChange, value, w, size, defaultValue, min, max }, ref: any) => (
  <NumberInput
    name={name}
    ref={ref}
    placeholder={placeholder}
    size={size ?? 'md'}
    onChange={onChange}
    value={value}
    w={w}
    defaultValue={defaultValue}
    variant="flushed"
    min={min ?? 0}
    max={max}>
    {' '}
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
));

export const FormWeightInput: React.FC<IProps> = forwardRef(({ name, placeholder, onChange, value, w, size, defaultValue, min, max }, ref: any) => (
  <NumberInput
    name={name}
    ref={ref}
    step={0.25}
    placeholder={placeholder}
    size={size ?? 'md'}
    onChange={onChange}
    value={value}
    w={w}
    defaultValue={defaultValue}
    variant="flushed"
    min={min ?? 0}
    max={max}>
    {' '}
    <NumberInputField />
    <NumberInputStepper>
      <NumberIncrementStepper />
      <NumberDecrementStepper />
    </NumberInputStepper>
  </NumberInput>
));

export const EmailInput: React.FC<IProps> = forwardRef(({ name }, ref: any) => {
  return (
    <Stack spacing={4}>
      <InputGroup size="md" w="100%" p="2">
        <InputLeftElement children={<Icon name="phone" color="gray.300" />} />
        <Input name={name} type="email" placeholder="Enter Email" ref={ref} />
      </InputGroup>
    </Stack>
  );
});

export const PasswordInput: React.FC<IProps> = forwardRef(({ name }, ref: any) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md" w="100%" p="2">
      <InputLeftElement children={<Icon name="phone" color="gray.300" />} />
      <Input name={name} type={show ? 'text' : 'password'} placeholder="Enter password" ref={ref} />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
});
