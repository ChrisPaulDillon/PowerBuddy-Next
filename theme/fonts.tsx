import { theme } from "@chakra-ui/core";

const mainFonts = {
  heading: '"Roboto", sans-serif',
  body: '"Roboto", sans-serif',
  mono: '"Roboto", monospace',
};

const fonts = {
  ...theme.fonts,
  mainFonts,
};

export default fonts;
