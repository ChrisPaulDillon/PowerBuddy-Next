import { Divider as ChakraDivider, DividerProps } from '@chakra-ui/react';

export const Divider: React.FC<DividerProps> = ({ ...rest }) => {
  return <ChakraDivider {...rest} />;
};
