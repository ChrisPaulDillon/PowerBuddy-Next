import {
  Modal as ChakraModal,
  ModalOverlay as ChakraModalOverlay,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalFooter as ChakraModalFooter,
  ModalBody as ChakraModalBody,
  ModalCloseButton as ChakraModalCloseButton,
  ModalOverlayProps,
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  CloseButtonProps,
  Drawer as ChakraDrawer,
  DrawerBody as ChakraDrawerBody,
  DrawerFooter as ChakraDrawerFooter,
  DrawerHeader as ChakraDrawerHeader,
  DrawerOverlay as ChakraDrawerOverlay,
  DrawerContent as ChakraDrawerContent,
  DrawerCloseButton as ChakraDrawerCloseButton,
  DrawerContentProps,
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  MenuItemOption as ChakraMenuItemOption,
  MenuProps,
  MenuItemOptionProps,
  MenuListProps,
  MenuButtonProps,
  ModalProps,
  MenuItemProps,
  ModalFooterProps,
  Tooltip as ChakraTooltip,
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody as ChakraAlertDialogBody,
  AlertDialogFooter as ChakraAlertDialogFooter,
  AlertDialogHeader as ChakraAlertDialogHeader,
  AlertDialogContent as ChakraAlertDialogContent,
  AlertDialogOverlay as ChakraAlertDialogOverlay,
  AlertDialogProps,
  TooltipProps,
} from '@chakra-ui/react';

interface IModalExtendedProps extends ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<IModalExtendedProps> = ({ isOpen, onClose, ...rest }) => {
  return <ChakraModal isOpen={isOpen} onClose={onClose} {...rest} />;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ ...rest }) => {
  return <ChakraModalOverlay {...rest} />;
};

export const ModalContent: React.FC<ModalContentProps> = ({ ...rest }) => {
  return <ChakraModalContent {...rest} />;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ ...rest }) => {
  return <ChakraModalHeader {...rest} />;
};

export const ModalBody: React.FC<ModalBodyProps> = ({ ...rest }) => {
  return <ChakraModalBody {...rest} />;
};

export const ModalFooter: React.FC<ModalFooterProps> = ({ ...rest }) => {
  return <ChakraModalFooter {...rest} />;
};

export const ModalCloseButton: React.FC<CloseButtonProps> = ({ ...rest }) => {
  return <ChakraModalCloseButton {...rest} />;
};

interface IDrawerExtendedProps extends ModalProps {
  placement: any;
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer: React.FC<IDrawerExtendedProps> = ({ isOpen, onClose, placement, ...rest }) => {
  return <ChakraDrawer isOpen={isOpen} onClose={onClose} placement={placement} {...rest} />;
};

export const DrawerHeader: React.FC<ModalHeaderProps> = ({ ...rest }) => {
  return <ChakraDrawerHeader {...rest} />;
};

export const DrawerBody: React.FC<ModalBodyProps> = ({ ...rest }) => {
  return <ChakraDrawerBody {...rest} />;
};

export const DrawerOverlay: React.FC<ModalOverlayProps> = ({ ...rest }) => {
  return <ChakraDrawerOverlay {...rest} />;
};

export const DrawerContent: React.FC<DrawerContentProps> = ({ ...rest }) => {
  return <ChakraDrawerContent {...rest} />;
};

export const DrawerFooter: React.FC<DrawerContentProps> = ({ ...rest }) => {
  return <ChakraDrawerFooter {...rest} />;
};

export const DrawerCloseButton: React.FC<CloseButtonProps> = ({ ...rest }) => {
  return <ChakraDrawerCloseButton {...rest} />;
};

export const Menu: React.FC<MenuProps> = ({ ...rest }) => {
  return <ChakraMenu {...rest} />;
};

export const MenuButton: React.FC<MenuButtonProps> = ({ ...rest }) => {
  return <ChakraMenuButton {...rest} />;
};

export const MenuList: React.FC<MenuListProps> = ({ ...rest }) => {
  return <ChakraMenuList {...rest} />;
};

export const MenuItem: React.FC<MenuItemProps> = ({ ...rest }) => {
  return <ChakraMenuItem {...rest} />;
};

export const MenuItemOption: React.FC<MenuItemOptionProps> = ({ ...rest }) => {
  return <ChakraMenuItemOption {...rest} />;
};

export const Tooltip: React.FC<TooltipProps> = ({ ...rest }) => {
  return <ChakraTooltip {...rest} />;
};

export const AlertDialog: React.FC<AlertDialogProps> = ({ ...rest }) => {
  return <ChakraAlertDialog {...rest} />;
};

export const AlertDialogBody: React.FC<ModalBodyProps> = ({ ...rest }) => {
  return <ChakraAlertDialogBody {...rest} />;
};

export const AlertDialogFooter: React.FC<ModalFooterProps> = ({ ...rest }) => {
  return <ChakraAlertDialogFooter {...rest} />;
};

export const AlertDialogHeader: React.FC<ModalHeaderProps> = ({ ...rest }) => {
  return <ChakraAlertDialogHeader {...rest} />;
};

export const AlertDialogContent: React.FC<ModalContentProps> = ({ ...rest }) => {
  return <ChakraAlertDialogContent {...rest} />;
};

export const AlertDialogOverlay: React.FC<ModalOverlayProps> = ({ ...rest }) => {
  return <ChakraAlertDialogOverlay {...rest} />;
};
