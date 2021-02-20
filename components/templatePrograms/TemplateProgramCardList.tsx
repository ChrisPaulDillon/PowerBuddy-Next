import React from 'react';
import { CenterRowFlex } from '../layout/Flexes';
import { ITemplateProgram } from 'powerbuddy-shared';
import { Box } from '../../chakra/Layout';
import TemplateProgramCard from './TemplateProgramCard';

interface ListProps {
  templates: ITemplateProgram[];
}

const TemplateProgramCardList: React.FC<ListProps> = ({ templates = [] }) => (
  <CenterRowFlex justify="center">
    {templates.map((template, idx) => (
      <Box key={idx} p={2}>
        <TemplateProgramCard key={template.templateProgramId} template={template} />
      </Box>
    ))}
  </CenterRowFlex>
);

export default TemplateProgramCardList;
