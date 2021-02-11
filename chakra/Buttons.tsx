/* eslint-disable react/display-name */
import {
  ButtonProps,
  Button as ChakraButton,
  IconButton as ChakraIconButton,
  IconButtonProps,
  Switch as ChakraSwitch,
  Select as ChakraSelect,
  Image as ChakraImage,
  Checkbox as ChakraCheckbox,
  Link as ChakraLink,
  SwitchProps,
  Input as ChakraInput,
  InputLeftAddon as ChakraInputLeftAddon,
  InputRightAddon as ChakraInputRightAddon,
  Textarea as ChakraTextArea,
  InputProps,
  InputAddonProps,
  SelectProps,
  ImageProps,
  CheckboxProps,
  LinkProps,
  forwardRef,
  TextareaProps,
  Icon as ChakraIcon,
  FormLabel as ChakraFormLabel,
  IconProps,
  BoxProps,
  FormLabelProps,
} from '@chakra-ui/react';
import { ElementType } from 'react';

export const Button: React.FC<ButtonProps & { ref?: React.Ref<HTMLButtonElement> }> = forwardRef<
  ButtonProps & { ref: React.Ref<HTMLButtonElement> },
  ElementType<HTMLButtonElement>
>(({ ...rest }, ref) => {
  return <ChakraButton ref={ref} {...rest} />;
});

export const IconButton: React.FC<IconButtonProps & { ref?: React.Ref<HTMLButtonElement> }> = forwardRef<
  IconButtonProps & { ref: React.Ref<HTMLButtonElement> },
  ElementType<HTMLButtonElement>
>(({ ...rest }, ref) => {
  return <ChakraIconButton ref={ref} aria-label="" variant="ghost" {...rest} />;
});

export const Input: React.FC<InputProps & { ref?: React.Ref<HTMLInputElement> }> = forwardRef<
  InputProps & { ref: React.Ref<HTMLInputElement> },
  ElementType<HTMLInputElement>
>(({ ...rest }, ref) => {
  return <ChakraInput ref={ref} {...rest} />;
});

export const Textarea: React.FC<TextareaProps & { ref?: React.Ref<HTMLTextAreaElement> }> = forwardRef<
  TextareaProps & { ref: React.Ref<HTMLTextAreaElement> },
  ElementType<HTMLTextAreaElement>
>(({ ...rest }, ref) => {
  return <ChakraTextArea ref={ref} {...rest} />;
});

export const Select: React.FC<SelectProps & { ref?: React.Ref<HTMLSelectElement> }> = forwardRef<
  SelectProps & { ref: React.Ref<HTMLSelectElement> },
  ElementType<HTMLSelectElement>
>(({ ...rest }, ref) => {
  return <ChakraSelect ref={ref} {...rest} />;
});

export const Image: React.FC<ImageProps & { ref?: React.Ref<HTMLImageElement> }> = forwardRef<
  ImageProps & { ref: React.Ref<HTMLImageElement> },
  ElementType<HTMLImageElement>
>(({ ...rest }, ref) => {
  return <ChakraImage w={150} h={125} fallbackSrc={'/static/images/AW_placeholder.svg'} ref={ref} layerStyle="control" {...rest} />;
});

export const Link: React.FC<LinkProps & { ref?: React.Ref<HTMLAnchorElement> }> = forwardRef<
  LinkProps & { ref: React.Ref<HTMLAnchorElement> },
  ElementType<HTMLAnchorElement>
>(({ ...rest }, ref) => {
  return <ChakraLink color="secondary.700" textDecor={'underline'} ref={ref} {...rest} />;
});

export const InputLeftAddon: React.FC<InputAddonProps> = ({ ...rest }) => {
  return <ChakraInputLeftAddon {...rest} />;
};

export const InputRightAddon: React.FC<InputAddonProps> = ({ ...rest }) => {
  return <ChakraInputRightAddon {...rest} />;
};

export const Checkbox: React.FC<CheckboxProps & { ref?: React.Ref<HTMLInputElement> }> = forwardRef<
  CheckboxProps & { ref: React.Ref<HTMLInputElement> },
  ElementType<HTMLFormElement>
>(({ ...rest }, ref) => {
  return <ChakraCheckbox ref={ref} {...rest} />;
});

export const Switch: React.FC<SwitchProps & { ref?: React.Ref<HTMLInputElement> }> = forwardRef<
  SwitchProps & { ref: React.Ref<HTMLInputElement> },
  ElementType<HTMLFormElement>
>(({ ...rest }, ref) => {
  return <ChakraSwitch ref={ref} {...rest} />;
});

export const Icon: React.FC<IconProps & BoxProps> = ({ ...rest }) => {
  return <ChakraIcon h="1.5rem" w="auto" {...rest} />;
};

export const FormLabel: React.FC<FormLabelProps> = ({ ...rest }) => {
  return <ChakraFormLabel p="0" m="0" {...rest} />;
};
