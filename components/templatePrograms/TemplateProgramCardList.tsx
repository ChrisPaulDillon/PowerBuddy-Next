import React from 'react';
import { Box, Badge } from '@chakra-ui/core';
import { Card } from '../layout/Card';
import { HeadingMd } from '../common/Texts';
import { PbPrimaryButton } from '../common/Buttons';
import { CenterRowFlex } from '../layout/Flexes';
import { TEMPLATES_URL } from '../../InternalLinks';
import Link from 'next/link';
import { ITemplateProgram } from 'powerbuddy-shared';

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
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" m="2">
          {template.noOfWeeks} Weeks Long
        </Box>
      </Box>
      <Box pt="2">
        <Link
          href={{
            pathname: `${TEMPLATES_URL}/${template.templateProgramId}`,
            query: `program=${encodeURIComponent(template.name.replace(/\s+/g, '-'))}`,
            ...template,
          }}>
          <PbPrimaryButton>View</PbPrimaryButton>
        </Link>
      </Box>
    </Box>
  </Card>
);

export default TemplateProgramCardList;
