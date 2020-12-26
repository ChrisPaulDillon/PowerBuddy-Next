import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Heading, Stack, Text, Link, LightMode } from '@chakra-ui/core';
import { TextXs } from '../common/Texts';
import LandingFeed from './LandingFeed';
import { ITemplateProgramFeed } from '../../interfaces/templates';
import { CenterRowFlex } from '../layout/Flexes';
import { PORTAL_URL } from '../util/InternalLinks';

interface IHeroProps {
  openReg: () => void;
  image?: string;
  templateFeed: ITemplateProgramFeed[];
  userCount: number;
  repCount: number;
}

const Hero: React.FC<IHeroProps> = ({ openReg, templateFeed, userCount, repCount }) => {
  const handleAlreadyRegistered = () => {
    window.location.href = PORTAL_URL;
  };

  return (
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column', md: 'row' }}
      minH="25vh"
      px={8}
      mb={7}>
      <Stack spacing={4} w={{ base: '80%', md: '40%' }} align={['center', 'center', 'flex-start', 'flex-start']}>
        <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" textAlign={['center', 'center', 'left', 'left']}>
          PowerBuddy
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={['center', 'center', 'left', 'left']}>
          The All In One Weightlifting Solution
        </Heading>
        <TextXs textAlign="center">Your Programs, Personal Bests and Insights all in one place</TextXs>
        <Link to={PORTAL_URL}>
          <LightMode>
            <Button onClick={openReg} colorScheme="blue" borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
              Sign Up
            </Button>
          </LightMode>
        </Link>
        <Text fontSize="xs" mt={2} textAlign="center" color="primary.800" opacity="0.6">
          Already Signed Up?{' '}
          <Link onClick={handleAlreadyRegistered} color="blue.500">
            Go to Portal
          </Link>
        </Text>
      </Stack>
      <Box w={{ sm: '50%', md: '50%', lg: '50%', xl: '50%' }} mt={{ base: 12, md: 0 }}>
        <CenterRowFlex justify="center">
          <Flex flexDir="column" p={4}>
            {userCount && (
              <Box>
                <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" textAlign="center">
                  {userCount + 100}
                </Heading>
                <Heading
                  as="h2"
                  size="md"
                  color="primary.800"
                  opacity="0.8"
                  fontWeight="normal"
                  lineHeight={1.5}
                  textAlign={['center', 'center', 'left', 'left']}>
                  Active Users
                </Heading>
              </Box>
            )}
          </Flex>

          <Flex flexDir="column" p={4}>
            {repCount && (
              <Box>
                <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" textAlign="center">
                  {repCount}
                </Heading>
                <Heading
                  as="h2"
                  size="md"
                  color="primary.800"
                  opacity="0.8"
                  fontWeight="normal"
                  lineHeight={1.5}
                  textAlign={['center', 'center', 'left', 'left']}>
                  Total Sets Completed
                </Heading>{' '}
              </Box>
            )}
          </Flex>
        </CenterRowFlex>
        <LandingFeed templateFeed={templateFeed!} />

        {/* <Image src={heroImg} size="100%" rounded="1rem" shadow="2xl" /> */}
      </Box>
    </Flex>
  );
};

Hero.propTypes = {
  image: PropTypes.string,
};

Hero.defaultProps = {
  image: 'https://source.unsplash.com/collection/404339/800x600',
};

export default Hero;
