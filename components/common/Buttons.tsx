import React from 'react';
import { ButtonProps, LightMode } from '@chakra-ui/react';
import { Button } from '../../chakra/Forms';
import { Box } from '../../chakra/Layout';

export const FormButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <LightMode>
      <Box my={5}>
        <Button color="white" type="submit" isFullWidth {...rest}>
          {children}
        </Button>
      </Box>
    </LightMode>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button color="white" {...rest}>
      {children}
    </Button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button color="white" colorScheme="red" {...rest}>
      {children}
    </Button>
  );
};
