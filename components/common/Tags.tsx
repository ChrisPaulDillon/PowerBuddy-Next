import React from 'react';
import { Tag, useColorMode } from '@chakra-ui/react';
import theme from '../../theme';

const PbTag = ({ ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Tag
      rounded="full"
      //   colorScheme={theme.colors.tagColor[colorMode]}
      bg={theme.colors.tagColor[colorMode]}
      {...rest}></Tag>
  );
};

export default PbTag;
