import React, { useState } from 'react';
import NavBar from './NavBar';
import SideNav from './SideNav';
import Page from './Page';
import { Flex, Box, useColorMode, useDisclosure } from '@chakra-ui/core';
import FirstVisitAlert from '../misc/FirstVisitAlert';
import { IAppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import useScreenSizes from '../../hooks/useScreenSizes';
import { Banner, HeadingMd } from '../common/Texts';
import { CenterColumnFlex } from './Flexes';
import { PbModalForm } from '../common/Modals';
import { PbDrawerHeaderless } from '../common/Drawers';

const Layout = ({ children }: any) => {
  const { colorMode } = useColorMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state: IAppState) => state.state);
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);
  const [, setAddFirstVisitAlert] = useState<boolean | undefined>(true);
  const { onOpen, onClose } = useDisclosure();
  const { SCREEN_MOBILE } = useScreenSizes();
  return (
    <Box>
      <NavBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Flex flexDir="row">
        <SideNav menuOpen={menuOpen} />
        {!user.firstVisit && isAuthenticated ? (
          SCREEN_MOBILE ? (
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
            <PbModalForm title="Welcome To PowerBuddy! 🎉🎉" isOpen={!user.firstVisit} onClose={onClose}>
              <FirstVisitAlert setAddFirstVisitAlert={setAddFirstVisitAlert} />
            </PbModalForm>
          )
        ) : (
          <Page>{children}</Page>
        )}
      </Flex>
    </Box>
  );
};

export default Layout;