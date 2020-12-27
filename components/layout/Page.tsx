import { Box, useColorMode } from '@chakra-ui/core';
import Head from 'next/head';
import React from 'react';
import theme from '../../theme';

const Page: React.FC = ({ children, ...rest }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      overflowY="scroll"
      p={1}
      css={{
        scrollSnapType: 'x mandatory',
        '::-webkit-scrollbar': { width: 0 },
        '-msOverflowStyle': 'none',
        scrollbarWidth: 'none',
      }}
      {...rest}>
      {children}
    </Box>
  );
};

interface IPageHeaderProps {
  title: string;
}

export const PageHeader: React.FC<IPageHeaderProps> = ({ title }) => {
  return (
    <Head>
      {' '}
      <title>
        {process.env.NEXT_PUBLIC_SITE_NAME} | {title}
      </title>
      <link rel="icon" href="/icons/favicon.ico" />
    </Head>
  );
};

interface IPageContentProps {
  children: any;
}

export const PageContent: React.FC<IPageContentProps> = ({ children }) => {
  return <main>{children}</main>;
};

export default Page;
