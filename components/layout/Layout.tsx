import React, { useState } from 'react';
import NavBar from './NavBar';
import Page from './Page';
import { Flex, useColorMode, useDisclosure } from '@chakra-ui/core';
import FirstVisitAlert from '../misc/FirstVisitAlert';
import useScreenSizes from '../../hooks/useScreenSizes';
import { Banner, HeadingMd } from '../common/Texts';
import { CenterColumnFlex } from './Flexes';
import { ModalForm } from '../common/Modals';
import { PbDrawerHeaderless } from '../common/Drawers';
import theme from '../../theme';
import Footer from './Footer';
import { useUserContext } from '../users/UserContext';

const Layout = ({ children }: any) => {
  const { colorMode } = useColorMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUserContext();
  const [, setAddFirstVisitAlert] = useState<boolean | undefined>(true);
  const { onClose } = useDisclosure();
  const { SCREEN_MOBILE } = useScreenSizes();

  return (
    <Flex direction="column" align="center" m="0 auto" bgColor={theme.colors.background[colorMode]} mx={2}>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Flex flexDir="row">
        {/* <SideNav menuOpen={menuOpen} /> */}
        {!user.firstVisit &&
          isAuthenticated &&
          (SCREEN_MOBILE ? (
            <PbDrawerHeaderless
              size="full"
              onClose={onClose}
              isOpen={!user.firstVisit}
              title={
                <CenterColumnFlex>
                  <Banner>PowerBuddy</Banner>
                  <HeadingMd>The All In One Weightlifting Solution</HeadingMd>
                </CenterColumnFlex>
              }>
              <FirstVisitAlert setAddFirstVisitAlert={setAddFirstVisitAlert} />
            </PbDrawerHeaderless>
          ) : (
            <ModalForm title="Welcome To PowerBuddy! 🎉🎉" isOpen={!user.firstVisit} onClose={onClose}>
              <FirstVisitAlert setAddFirstVisitAlert={setAddFirstVisitAlert} />
            </ModalForm>
          ))}
        <Page>{children}</Page>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
