import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/core';
import Hero from './LandingHero';
import Header from './LandingHeader';
import RegisterForm from '../shared/RegisterForm';
import { ModalDrawerForm } from '../common/ModalDrawer';
import LandingList from './LandingList';
import { GetTemplateFeedUrl } from '../../api/public/template';
import { ITemplateProgramFeed } from '../../interfaces/templates';
import { useAxios } from '../../hooks/useAxios';
import { GetLandingPageMetrics } from '../../api/public/metrics';

interface ILandingPageMetrics {
  setCount: number;
  userCount: number;
}

export default function LandingIndexPage(props) {
  const { data: feedData } = useAxios<ITemplateProgramFeed[]>(GetTemplateFeedUrl());
  const { data: metrics } = useAxios<ILandingPageMetrics>(GetLandingPageMetrics());
  const { isOpen: isRegOpen, onOpen: openReg, onClose: onRegClose } = useDisclosure();

  return (
    <Flex direction="column" align="center" m="0 auto" px={10} maxW={{ xl: '1300px' }} {...props}>
      <Header />
      <Box>
        <Hero openReg={openReg} templateFeed={feedData!} userCount={metrics?.userCount!} repCount={metrics?.setCount!} />
        {props.children}
        {isRegOpen && (
          <ModalDrawerForm isOpen={isRegOpen} onClose={onRegClose} title="Sign Up!">
            <RegisterForm />
          </ModalDrawerForm>
        )}

        <LandingList />
      </Box>
    </Flex>
  );
}
