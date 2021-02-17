import Head from 'next/head';
import React from 'react';
import { Box } from '../../chakra/Layout';

const Page: React.FC = ({ children, ...rest }) => {
  return (
    <Box
      position="relative"
      height="85vh"
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
  description: string;
}

export const PageHead: React.FC<IPageHeaderProps> = ({ title, description }) => {
  return (
    <Head>
      <meta name="description" content={description} />
      <title>
        {title} | {process.env.NEXT_PUBLIC_SITE_NAME}
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
