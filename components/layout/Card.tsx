import { Box, useColorMode, BoxProps } from '@chakra-ui/react';
import React from 'react';
import theme from '../../theme';

export const Card: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderStyle="rd"
      boxShadow="0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)"
      position="relative"
      p="2"
      alignContent="center"
      justifyContent="center"
      rounded="lg"
      minW={['xs', 'sm', 'sm', 'sm']}
      {...rest}
    />
  );
};

export const CardSm: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={theme.colors.cardColor[colorMode]}
      borderStyle="rd"
      boxShadow="0 3.2px 7.2px 0 rgba(0,0,0,.132), 0 0.6px 1.8px 0 rgba(0,0,0,.108)"
      position="relative"
      p="2"
      alignContent="center"
      justifyContent="center"
      rounded="lg"
      minW={['xs', 'sm', 'sm', 'sm']}
      {...rest}
    />
  );
};

export const CardNoShadow: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={theme.colors.cardColor[colorMode]}
      position="relative"
      p={2}
      alignContent="center"
      justifyContent="center"
      rounded="lg"
      minW={{ lg: '1200px', md: '800px', sm: '300px' }}
      {...rest}
    />
  );
};

export const ProgramExerciseCard: React.FC<BoxProps> = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  const border = { light: '1px solid #E7E7E7', dark: '1px solid grey.300' };
  return (
    <Box
      bg={theme.colors.cardColor[colorMode]}
      position="relative"
      alignContent="center"
      justifyContent="center"
      textAlign="center"
      // rounded="lg"
      w="100%"
      // borderBottom={border[colorMode]}
      // borderTop={border[colorMode]}
      {...rest}
    />
  );
};
