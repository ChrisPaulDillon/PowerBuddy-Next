import React from 'react';
import { Stack, Link, Box, Text } from '@chakra-ui/core';
import { MdArrowBack } from 'react-icons/md';

export const MenuPage = ({ title, description, onClickBack, children, ...rest }: any) => {
  return (
    <>
      <Stack isInline w="100%" justify="space-between" align="center" px="0.5em" mb="1em">
        <Text fontWeight="semibold">{title}</Text>
        <Box m="0.5em"></Box>
      </Stack>
      <Stack px="1em">
        <Text fontSize="sm">{description}</Text>
        <Box my="1em"></Box>
        {children}
        <Box my="0.25em"></Box>
      </Stack>
    </>
  );
};

export const MenuPageSingle = ({ title, description, onClickBack, children, ...rest }: any) => {
  return (
    <>
      <Stack isInline w="100%" justify="space-between" align="center" px="0.5em" mb="1em">
        <Link>
          <Box as={MdArrowBack} size="1.25em" m="0.5em" onClick={onClickBack}></Box>
        </Link>
        <Text fontWeight="semibold">{title}</Text>
        <Box m="0.5em"></Box>
      </Stack>
      <Stack px="1em">
        <Text fontSize="sm">{description}</Text>
        <Box my="1em"></Box>
        {children}
        <Box my="0.25em"></Box>
      </Stack>
    </>
  );
};
