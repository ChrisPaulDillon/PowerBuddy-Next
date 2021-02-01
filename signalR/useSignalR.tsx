import { ToastAvatar } from '../components/common/CustomToasts';
import { useToast } from '@chakra-ui/core';
import { useState, useEffect } from 'react';
import { MESSAGE_METHOD_ALL } from './SignalRConstants';
import { IUserMessage } from './types';
import * as signalR from '@microsoft/signalr';

const useSignalR = () => {
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
      connection.on(MESSAGE_METHOD_ALL, (message: IUserMessage) => {
        console.log(message);

        toast({
          position: 'top-left',
          render: () => <ToastAvatar userName={message?.userName} description={message?.body} />,
        });
      });
    }
  }, [connection]);
};

export default useSignalR;
