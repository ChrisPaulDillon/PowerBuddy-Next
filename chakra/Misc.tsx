import { LightMode as ChakraLightMode, DarkMode as ChakraDarkMode } from '@chakra-ui/react';

export const LightMode: React.FC<{}> = () => {
  return <ChakraLightMode />;
};

export const DarkMode: React.FC<{}> = () => {
  return <ChakraDarkMode />;
};
