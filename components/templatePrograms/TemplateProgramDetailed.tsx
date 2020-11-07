import React, { useEffect, useState } from 'react';
import { Box, Flex, Divider, Tabs, Tab, TabList, TabPanels, TabPanel, useDisclosure } from '@chakra-ui/core';
import { TemplateExerciseCard, ExerciseCard } from '../layout/Card';
import ITemplateExercise, { ITemplateWeek, ITemplateDay, ITemplateRepScheme, ITemplateProgramExtended } from '../../interfaces/templates';
import { TextSm, HeadingMd, PageHeader } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { PbPrimaryButton } from '../common/Buttons';
import { FaRunning } from 'react-icons/fa';
import CreateProgramLogFromTemplateForm from './forms/CreateProgramLogFromTemplateForm';
import ProgressSpinner from '../common/ProgressSpinner';
import { GetTemplateProgramByIdUrl } from '../../api/public/template';
import { useAxios } from '../../hooks/useAxios';
import { useParams } from 'react-router';
import { PbModalDrawerForm } from '../common/ModalDrawer';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import { LoginModal } from '../common/Modals';

const TemplateProgramDetailed = () => {
  //@ts-ignore
  const { templateProgramId } = useParams();
  const { loading, data, error } = useAxios<ITemplateProgramExtended>(GetTemplateProgramByIdUrl(templateProgramId!));
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);
  const { isOpen: isAddProgramOpen, onOpen: onAddProgramOpen, onClose: onAddProgramClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const [template, setTemplate] = useState<ITemplateProgramExtended>({} as ITemplateProgramExtended);

  useEffect(() => {
    if (data != null) setTemplate(data);
  }, [templateProgramId, data, error, template]);

  if (loading) return <ProgressSpinner />;
  if (error) return <PageHeader>No Template Found</PageHeader>;

  return (
    <Flex flexDir="row" flexWrap="wrap-reverse" p="1" alignContent="center" alignItems="center" justifyContent="center">
      <Box mt="2">
        <CenterColumnFlex flexDir="column">
          <PageHeader>{template!.name}</PageHeader>
          <Flex flexDir="column">
            <TextSm>Difficulty: {template!.difficulty}</TextSm>
            <TextSm>Length : {template!.noOfWeeks} Weeks</TextSm>
          </Flex>
          <Box mt="5">
            <PbPrimaryButton colorScheme="red" onClick={isAuthenticated ? onAddProgramOpen : onLoginOpen} leftIcon={<FaRunning />}>
              USE TEMPLATE
            </PbPrimaryButton>
          </Box>
        </CenterColumnFlex>
        <CenterColumnFlex mt="2">
          <Tabs variant="soft-rounded" colorScheme="red" align="center" size="sm">
            <TabList>
              {template!.templateWeeks!.map((tw) => {
                return <Tab>Week {tw.weekNo}</Tab>;
              })}
            </TabList>
            <TabPanels>
              {template!.templateWeeks!.map((tw) => {
                return (
                  <TabPanel>
                    <TemplateWeekCard key={tw.templateWeekId} {...tw} />
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        </CenterColumnFlex>
        {isAddProgramOpen && (
          <PbModalDrawerForm title="Create a New Program Log" isOpen={isAddProgramOpen} onClose={onAddProgramClose}>
            <CreateProgramLogFromTemplateForm onClose={onAddProgramClose} template={template!} />
          </PbModalDrawerForm>
        )}
        {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
      </Box>
    </Flex>
  );
};

const TemplateWeekCard: React.FC<ITemplateWeek> = ({ templateDays }) => {
  const templateDaysSorted = [...templateDays].sort((a, b) => a.dayNo - b.dayNo);
  return (
    <ExerciseCard width="100%" pt="2" mt="3">
      <Flex flexDir={{ lg: 'row', md: 'row', sm: 'row', xs: 'column' }} flexWrap="wrap" justifyContent="center">
        {templateDaysSorted.map((td) => {
          return <TemplateDay key={td.templateDayId} {...td} />;
        })}
      </Flex>
    </ExerciseCard>
  );
};

const TemplateDay: React.FC<ITemplateDay> = ({ dayNo, templateExercises }) => (
  <Box>
    <HeadingMd>Day {dayNo}</HeadingMd>
    <CenterColumnFlex>
      <TemplateExerciseCard>
        {templateExercises.map((te) => {
          return <TemplateExercise key={te.templateExerciseId} {...te} />;
        })}
      </TemplateExerciseCard>
    </CenterColumnFlex>
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
  const templateRepSchemeSorted = [...templateRepSchemes].sort((a, b) => a.setNo - b.setNo);
  const repSchemes = templateRepSchemeSorted.map((trs) => {
    return <TemplateRepScheme key={trs.templateRepSchemeId} {...trs} />;
  });

  let exercisePercentage = templateRepSchemeSorted[0].percentage ? templateRepSchemeSorted[0].percentage + '%' : '';

  return (
    <CenterColumnFlex p="2">
      <HeadingMd>{exercise.exerciseName}</HeadingMd>
      <TextSm>
        {repSchemeFormat} {repSchemeType === 'Fixed' ? exercisePercentage : null}
      </TextSm>
      <TextSm mt="2">
        {repSchemeType !== 'Fixed' && repSchemes} {/*//ommit the individual sets if they are all the same rep range and weight */}
        {hasBackOffSets && 'Back Off Sets: ' + backOffSetFormat} {/*//Handle back off sets seperately */}
      </TextSm>
    </CenterColumnFlex>
  );
};

const TemplateRepScheme: React.FC<ITemplateRepScheme> = ({ percentage, isBackOffSet, amrap, noOfReps }) => (
  <CenterColumnFlex>
    <Box>
      {!!percentage &&
        !isBackOffSet &&
        !amrap && ( //Handle non back off sets and percentage based lifts
          <TextSm>
            {percentage}% x{noOfReps}
          </TextSm>
        )}
      {amrap && (
        <TextSm>
          {percentage}% x{noOfReps}+
        </TextSm> //Handle as many reps as possible scheme
      )}
    </Box>
  </CenterColumnFlex>
);

export default TemplateProgramDetailed;
