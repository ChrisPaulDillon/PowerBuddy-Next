import * as React from 'react';
import { Box, BoxProps, Button, LightMode, Stack } from '@chakra-ui/core';
import { TextSm } from './Texts';
import { IconType } from 'react-icons/lib';

interface IPrimaryButton {
  type?: any;
  loading?: boolean;
  leftIcon?: React.ReactElement;
  variant?: string;
  size?: string;
  isDisabled?: boolean;
  colorScheme?: string;
  onClick?: () => void;
}

export const PbPrimaryButton: React.FC<IPrimaryButton> = ({
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
        colorScheme={colorScheme ?? 'blue'}
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

interface IProps {
  Icon: IconType;
  onClick: () => void;
  loading: boolean;
  children: any;
}

export const PbMenuButton: React.FC<IProps> = ({ Icon, children, loading, onClick, ...rest }) => {
  return (
    <LightMode>
      <Button
        as={'a'}
        isFullWidth
        borderRadius={0}
        alignItems="center"
        justifyContent="left"
        p={0}
        bg="transparent"
        onClick={onClick}
        isLoading={loading}
        {...rest}>
        <Stack isInline w="100%" px="1.5em" align="center" justify="center">
          <Box as={Icon} size="1.25em"></Box>
          <TextSm ml="0.5em" fontWeight="normal">
            {children}
          </TextSm>
        </Stack>
      </Button>
    </LightMode>
  );
};
