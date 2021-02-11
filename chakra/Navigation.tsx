import {
  Link as ChakraLink,
  LinkBox as ChakraLinkBox,
  LinkOverlay as ChakraLinkOverlay,
  LinkBoxProps,
  LinkProps,
  LinkOverlayProps,
} from '@chakra-ui/react';

export const Link: React.FC<LinkProps> = ({ ...rest }) => {
  return <ChakraLink {...rest} />;
};

export const LinkBox: React.FC<LinkBoxProps> = ({ ...rest }) => {
  return <ChakraLinkBox {...rest} />;
};

export const LinkOverlay: React.FC<LinkOverlayProps> = ({ ...rest }) => {
  return <ChakraLinkOverlay {...rest} />;
};
