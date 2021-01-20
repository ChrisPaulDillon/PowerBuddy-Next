import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Page from './Page';
import { Flex, useColorMode, useDisclosure } from '@chakra-ui/core';
import FirstVisitAlert from '../misc/FirstVisitAlert';
import theme from '../../theme';
import Footer from './Footer';
import { useUserContext } from '../users/UserContext';
import { ModalDrawerForm } from '../common/ModalDrawer';

const Layout = ({ children }: any) => {
  const { colorMode } = useColorMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUserContext();
  const [] = useState<boolean | undefined>(true);

  const { onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (user && !user.firstVisit) {
      onOpen();
    }
  }, [user]);

  return (
    <Flex direction="column" align="center" m="0 auto" bgColor={theme.colors.background[colorMode]} mx={2}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Flex flexDir="row">
        {!user.firstVisit && isAuthenticated && (
          <ModalDrawerForm onClose={onClose} isOpen={!user.firstVisit} title="Welcome To PowerBuddy! 🎉🎉">
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
