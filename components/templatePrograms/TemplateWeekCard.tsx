import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Card } from '../layout/Card';
import { TextSm, TextXs, HeadingMdStatic } from '../common/Texts';
import { TagTemplateRepScheme } from '../shared/Tags';
import { ITemplateWeek, ITemplateDay, ITemplateRepScheme } from 'powerbuddy-shared/lib';
import ITemplateExercise from 'powerbuddy-shared/lib/interfaces/templates';

export const TemplateWeekCard: React.FC<ITemplateWeek> = ({ templateDays }) => {
  return (
    <Card p={0}>
      <Flex flexDir={{ lg: 'row', md: 'row', sm: 'column' }} flexWrap="wrap" justifyContent="center">
        {templateDays.map((td) => {
          return <TemplateDay key={td.templateDayId} {...td} />;
        })}
      </Flex>
    </Card>
  );
};

const TemplateDay: React.FC<ITemplateDay> = ({ dayNo, templateExercises }) => (
  <Box minW="20em" py={[8, 4, 4, 4]}>
    <HeadingMdStatic mb={2}>Day {dayNo}</HeadingMdStatic>
    {templateExercises.map((te) => {
      return <TemplateExercise key={te.templateExerciseId} {...te} />;
    })}
  </Box>
);

const TemplateExercise: React.FC<ITemplateExercise> = ({
  exercise,
  repSchemeFormat,
  hasBackOffSets,
  backOffSetFormat,
  repSchemeType,
  templateRepSchemes,
}) => {
  let exercisePercentage = templateRepSchemes[0].percentage ? templateRepSchemes[0].percentage + '%' : '';

  return (
    <Box py={2}>
      <TextSm pb={2}>
        {exercise.exerciseName} {repSchemeFormat} {repSchemeType === 'Fixed' && exercisePercentage}
      </TextSm>
      {repSchemeType !== 'Fixed' && templateRepSchemes.map((trs) => <TemplateRepScheme key={trs.templateRepSchemeId} {...trs} />)}
      <TextXs>{hasBackOffSets && 'Back Off Sets ' + backOffSetFormat}</TextXs>
    </Box>
  );
};

const TemplateRepScheme: React.FC<ITemplateRepScheme> = ({ percentage, isBackOffSet, amrap, noOfReps }) => (
  <Box py={1}>
    {/* //Handle non back off sets and percentage based lifts */}
    {!!percentage && !isBackOffSet && !amrap && <TagTemplateRepScheme body={`${percentage}% x${noOfReps}`} />}
    {amrap && <TagTemplateRepScheme body={`${percentage}% x${noOfReps}+`} />}
  </Box>
);
