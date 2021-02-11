import { Button, LightMode } from '@chakra-ui/react';
import React from 'react';
import { TextSm } from './Texts';

interface IButtonProps {
  type?: any;
  loading?: boolean;
  leftIcon?: React.ReactElement;
  variant?: string;
  size?: string;
  isDisabled?: boolean;
  colorScheme?: string;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<IButtonProps> = ({
  type,
  leftIcon,
  loading,
  variant,
  size,
  isDisabled,
  colorScheme,
  onClick,
  children,
  ...rest
}) => {
  return (
    <LightMode>
      <Button
        colorScheme={colorScheme ?? 'purple'}
        fontStyle="Roboto"
        type={type}
        isLoading={loading}
        leftIcon={leftIcon}
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        onClick={onClick}
        {...rest}>
        <TextSm>{children}</TextSm>
      </Button>
    </LightMode>
  );
};

export const SecondaryButton: React.FC<IButtonProps> = ({
  type,
  leftIcon,
  loading,
  variant,
  size,
  isDisabled,
  colorScheme,
  onClick,
  children,
  ...rest
}) => {
  return (
    <LightMode>
      <Button
        colorScheme={colorScheme ?? 'red'}
        fontStyle="Roboto"
        type={type}
        isLoading={loading}
        leftIcon={leftIcon}
        variant={variant}
        size={size}
        isDisabled={isDisabled}
        onClick={onClick}
        {...rest}>
        <TextSm>{children}</TextSm>
      </Button>
    </LightMode>
  );
};
