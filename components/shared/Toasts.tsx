import { ToastOptions, UseToastOptions } from '@chakra-ui/core';
import React from 'react';

interface IToastProps {
  title?: string;
  description: string;
}

export const ToastSuccess = (title: string, description: string): UseToastOptions => {
  const toast: UseToastOptions = {
    title: title ?? 'Success',
    description: description,
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'top',
  };
  return toast;
};

export const ToastError = (title: string, description: string): UseToastOptions => {
  const toast: UseToastOptions = {
    title: title ?? 'Error',
    description: description,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'top',
  };
  return toast;
};

export const ToastWarning = (title: string, description: string): UseToastOptions => {
  const toast: UseToastOptions = {
    title: title ?? 'Warning',
    description: description,
    status: 'warning',
    duration: 5000,
    isClosable: true,
    position: 'top',
  };
  return toast;
};
