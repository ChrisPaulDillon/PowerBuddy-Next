import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Page from './Page';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import FirstVisitAlert from '../misc/FirstVisitAlert';
import theme from '../../theme';
import { useUserContext } from '../users/UserContext';
import { ModalDrawerForm } from '../common/ModalDrawers';
import useSignalR from '../../signalR/useSignalR';
import { Flex } from '../../chakra/Layout';
import Footer from './Footer';

const Layout = ({ children }: any) => {
  const { colorMode } = useColorMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, firstVisit } = useUserContext();

  const { onOpen, onClose } = useDisclosure();

  useSignalR();

  useEffect(() => {
    if (firstVisit) {
      onOpen();
    }
  }, [firstVisit]);

  return (
    <Flex direction="column" m="0 auto" bgColor={theme.colors.background[colorMode]} mx={2}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Flex flexDir="row">
        {!firstVisit && isAuthenticated && (
          <ModalDrawerForm onClose={onClose} isOpen={!firstVisit} title="Welcome To PowerBuddy! 🎉🎉">
            <FirstVisitAlert onClose={onClose} />
          </ModalDrawerForm>
        )}
        <Page>{children}</Page>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
