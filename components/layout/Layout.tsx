import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Page from './Page';
import { Flex, useColorMode, useDisclosure, useToast } from '@chakra-ui/core';
import FirstVisitAlert from '../misc/FirstVisitAlert';
import theme from '../../theme';
import Footer from './Footer';
import { useUserContext } from '../users/UserContext';
import { ModalDrawerForm } from '../common/ModalDrawer';
import * as signalR from '@microsoft/signalr';

const Layout = ({ children }: any) => {
  const { colorMode } = useColorMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUserContext();

  const { onOpen, onClose } = useDisclosure();

  const [connection, setConnection] = useState<signalR.HubConnection>();
  const toast = useToast();

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder().withUrl(process.env.NEXT_PUBLIC_BASE_SIGNALR).withAutomaticReconnect().build();
    connection.start().catch((error) => console.log(error));
    setConnection(connection);
    return () => {
      connection.stop();
      setConnection(null);
    };
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveMessage', (message) => {
        toast({
          title: 'Message Received',
          description: message,
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      });
    }
  }, [connection]);

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
