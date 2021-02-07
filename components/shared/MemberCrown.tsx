//@ts-nocheck
import React from 'react';
import { Box, BoxProps, Icon } from '@chakra-ui/react';
import { FaCrown } from 'react-icons/fa';

interface IProps extends BoxProps {
  memberStatusId: number;
}

const MemberCrown: React.FC<IProps> = ({ memberStatusId, ...rest }) => {
  return (
    <Box>
      {
        {
          1: <Icon as={FaCrown} color="white.500" boxSize="25px" {...rest} />,
          2: <Icon as={FaCrown} color="purple.500" boxSize="25px" {...rest} />,
          3: <Icon as={FaCrown} color="blue.500" boxSize="25px" {...rest} />,
          4: <Icon as={FaCrown} color="yellow.400" boxSize="25px" {...rest} />,
        }[memberStatusId!]
      }
    </Box>
  );
};

export default MemberCrown;
