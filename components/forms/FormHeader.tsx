import Link from 'next/link';
import React from 'react';
import { Box } from '../../chakra/Layout';
import { Heading, Text } from '../../chakra/Typography';
import { useColorModeValue as mode } from '@chakra-ui/react';

interface IFormHeaderProps {
  heading: string;
  spanText: string;
  linkText: string;
  linkUrl: string;
}

export const FormHeader: React.FC<IFormHeaderProps> = ({ heading, spanText, linkText, linkUrl }) => (
  <Box maxW={{ sm: 'md' }} mx={{ sm: 'auto' }} w={{ sm: 'full' }}>
    <Box mb={{ base: '10', md: '28' }}></Box>
    <Heading mt="6" textAlign="center" size="xl" fontWeight="extrabold">
      {heading}
    </Heading>
    <Text mt="4" align="center" maxW="md" fontWeight="medium">
      <span>{spanText}</span>
      <Box as="a" marginStart="1" color={mode('blue.600', 'blue.200')} _hover={{ color: 'blue.600' }} display={{ base: 'block', sm: 'revert' }}>
        <Link href={linkUrl}>{linkText}</Link>
      </Box>
    </Text>
  </Box>
);
