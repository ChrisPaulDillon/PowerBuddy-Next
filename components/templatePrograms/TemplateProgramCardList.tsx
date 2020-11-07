import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Box, Badge, Button, Image } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { Card } from '../layout/Card';
import { ITemplateProgram } from '../../interfaces/templates';
import { HeadingMd } from '../common/Texts';
import { PbPrimaryButton } from '../common/Buttons';
import { GiWeightLiftingDown } from 'react-icons/gi';
import { CenterRowFlex } from '../layout/Flexes';

interface ListProps {
  templates: ITemplateProgram[];
}

const TemplateProgramCardList: React.FC<ListProps> = ({ templates = [] }) => (
  <CenterRowFlex justify="center">
    {templates.map((template) => (
      <TemplateProgramCard key={template.templateProgramId} template={template} />
    ))}
  </CenterRowFlex>
);

interface Props {
  key: number;
  template: ITemplateProgram;
}

const TemplateProgramCard: React.FC<Props> = ({ template }) => (
  <Card borderWidth="1px" rounded="lg" overflow="hidden" m="2" textAlign="center">
    <Box d="flex" alignItems="baseline" p="2">
      <Badge rounded="full" colorScheme="teal">
        New
      </Badge>
    </Box>
    <Box p="4">
      <HeadingMd>{template.name}</HeadingMd>
      <Box>
        <Box as="span" color="gray.600" fontSize="sm">
          {template.difficulty}
        </Box>
      </Box>
      <Box>
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" m="2">
          Length : {template.noOfWeeks} Weeks
        </Box>
      </Box>
      <Box pt="2">
        <Link
          to={{
            pathname: '/templates/' + template.templateProgramId,
            ...template,
          }}>
          <PbPrimaryButton colorScheme="blue" leftIcon={<GiWeightLiftingDown />}>
            DETAILS
          </PbPrimaryButton>
        </Link>
      </Box>
    </Box>
  </Card>
);

export default TemplateProgramCardList;
