import { ToastPosition, useToast } from '@chakra-ui/react';
import React from 'react';
import { ToastAvatar, ToastError, ToastSuccess, ToastWarning } from '../components/common/CustomToasts';
import { isMobile } from 'react-device-detect';

const TOAST_POSITION = isMobile ? ('bottom-left' as ToastPosition) : ('top' as ToastPosition);
const DURATION = 2500 as number;

const useFireToast = () => {
  const toast = useToast();

  const UserMessage = (userName: string, description: string) => {
    toast({
      position: TOAST_POSITION,
      render: () => <ToastAvatar userName={userName} description={description} />,
      duration: DURATION,
      isClosable: true,
    });
  };

  const Success = (description: string) => {
    toast({
      position: TOAST_POSITION,
      render: () => <ToastSuccess description={description} />,
      duration: DURATION,
      isClosable: true,
    });
  };

  const Error = (description: string) => {
    toast({
      position: TOAST_POSITION,
      render: () => <ToastError description={description} />,
      duration: DURATION,
      isClosable: true,
    });
  };

  const Warning = (description: string) => {
    toast({
      position: TOAST_POSITION,
      render: () => <ToastWarning description={description} />,
      duration: DURATION,
      isClosable: true,
    });
  };

  return { Success, Error, Warning, UserMessage };
};

export default useFireToast;
