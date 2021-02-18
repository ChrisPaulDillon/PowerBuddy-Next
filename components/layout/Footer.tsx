import { Box, ButtonGroup, Flex, IconButton, Link, Stack, Text, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import theme from '../../theme';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box as="footer" role="contentinfo" py="1" borderTop="1px" borderColor={theme.colors.borderColor[colorMode]}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        minW={{ base: 'xs', lg: '7xl', md: 'xl', sm: 'xs' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
        align="center">
        <a aria-current="page" aria-label="Back to Home page" href="/" rel="home"></a>
        <Stack
          my={{ base: '6', md: 0 }}
          direction={{ base: 'column', md: 'row' }}
          marginStart={{ md: '8' }}
          fontSize="sm"
          spacing={{ base: '2', md: '8' }}
          textAlign={{ base: 'center', md: 'start' }}>
          <Text>&copy; {new Date().getFullYear()} PowerBuddy</Text>
          <Link>Privacy</Link>
          <Link>Terms and Conditions</Link>
        </Stack>
        <ButtonGroup marginStart={{ md: 'auto' }} color="gray.600" variant="ghost">
          <IconButton as="a" aria-label="LinkedIn" icon={<FaLinkedin />} />
          <IconButton as="a" aria-label="LinkedIn" icon={<FaGithub />} />
          <IconButton as="a" aria-label="LinkedIn" icon={<FaTwitter />} />
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Footer;
