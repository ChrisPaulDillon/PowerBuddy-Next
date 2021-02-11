import {
  Accordion as ChakraAccordion,
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  TabPanels as ChakraTabPanels,
  Tab as ChakraTab,
  TabPanel as ChakraTabPanel,
  AccordionProps,
  TabProps,
  TabsProps,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
} from '@chakra-ui/react';

export const Accordion: React.FC<AccordionProps> = ({ ...rest }) => {
  return <ChakraAccordion {...rest} />;
};

export const Tabs: React.FC<TabsProps> = ({ ...rest }) => {
  return <ChakraTabs {...rest} />;
};

export const Tab: React.FC<TabProps> = ({ ...rest }) => {
  return <ChakraTab {...rest} />;
};

export const TabList: React.FC<TabListProps> = ({ ...rest }) => {
  return <ChakraTabList {...rest} />;
};

export const TabPanels: React.FC<TabPanelsProps> = ({ ...rest }) => {
  return <ChakraTabPanels {...rest} />;
};

export const TabPanel: React.FC<TabPanelProps> = ({ ...rest }) => {
  return <ChakraTabPanel {...rest} />;
};
