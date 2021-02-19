import React from 'react';
import { ButtonProps, LightMode } from '@chakra-ui/react';
import { TextSm } from './Texts';
import { Button } from '../../chakra/Forms';
import { Box } from '../../chakra/Layout';

export const FormButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <LightMode>
      <Box my={5}>
        <Button colorScheme="whatsapp" type="submit" isFullWidth {...rest}>
          <TextSm fontWeight="light">{children}</TextSm>
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
    <Button colorScheme="red" {...rest}>
      {children}
    </Button>
  );
};
