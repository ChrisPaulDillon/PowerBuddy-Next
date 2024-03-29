import { Badge, useColorMode } from '@chakra-ui/react';
import Link from 'next/link';
import { ITemplateProgram } from 'powerbuddy-shared/lib';
import React from 'react';
import { Box, Flex, Stack } from '../../chakra/Layout';
import { TEMPLATES_URL } from '../../InternalLinks';
import { PrimaryButton } from '../common/Buttons';
import { HeadingMd } from '../common/Texts';
import { Text } from '../../chakra/Typography';
import theme from '../../theme';

interface IProps {
  template: ITemplateProgram;
}

const TemplateProgramCard: React.FC<IProps> = ({ template }) => {
  const { colorMode } = useColorMode();

  return (
    <Box w="350px" bg={theme.colors.cardColor[colorMode]} boxShadow={'2xl'} rounded={'md'} overflow={'hidden'} justifyContent="center">
      <Box d="flex" alignItems="baseline" p="2">
        <Badge rounded="full" colorScheme="teal">
          New
        </Badge>
      </Box>
      <Box p="4">
        <HeadingMd textAlign="center">{template.name}</HeadingMd>

        <Stack direction={'row'} justify={'center'} spacing={6} mt={4}>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={400}>{template.difficulty}</Text>
          </Stack>
          <Stack spacing={0} align={'center'}>
            <Text fontWeight={400}>{template.noOfWeeks} Weeks Long</Text>
          </Stack>
        </Stack>
        <Flex pt={5} justify="center" flexDir="column" align="center">
          <Text fontWeight={400} textAlign="center">
            {template.noOfDaysPerWeek} Days Per Week
          </Text>
          <Box mt={5}>
            <Link
              href={{
                pathname: `${TEMPLATES_URL}/${template.templateProgramId}`,
                query: `program=${encodeURIComponent(template.name.replace(/\s+/g, '-'))}`,
                ...template,
              }}>
              <PrimaryButton isFullWidth>View</PrimaryButton>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default TemplateProgramCard;
