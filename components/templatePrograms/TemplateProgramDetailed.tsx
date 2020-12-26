import React from 'react';
import { Box, Flex, Tabs, Tab, TabList, TabPanels, TabPanel, useDisclosure, Badge, Divider } from '@chakra-ui/core';
import { Card } from '../layout/Card';
import ITemplateExercise, { ITemplateWeek, ITemplateDay, ITemplateRepScheme, ITemplateProgramExtended } from '../../interfaces/templates';
import { TextSm, HeadingMd, PageHeader, TextXsFade, TextXs, HeadingMdStatic } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { PbPrimaryButton } from '../common/Buttons';
import { FaRunning } from 'react-icons/all';
import CreateProgramLogFromTemplateForm from './forms/CreateProgramLogFromTemplateForm';
import ProgressSpinner from '../common/ProgressSpinner';
import { GetTemplateProgramByIdUrl } from '../../api/public/template';
import { useAxios } from '../../hooks/useAxios';
import { useHistory, useParams } from 'react-router';
import { ModalDrawerForm } from '../common/ModalDrawer';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import { LoginModal } from '../shared/Modals';
import { TEMPLATES_URL, WORKOUT_DIARY_URL } from '../util/InternalLinks';
import { TagTemplateRepScheme } from '../shared/Tags';
import { BreadcrumbBase, IBreadcrumbInput } from '../common/Breadcrumbs';
import { ModalForward } from '../common/Modals';

const TemplateProgramDetailed = () => {
  //@ts-ignore
  const { templateProgramId } = useParams();
  const history = useHistory();

  const { loading, data: template, error } = useAxios<ITemplateProgramExtended>(GetTemplateProgramByIdUrl(templateProgramId!));
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);

  const { isOpen: isAddProgramOpen, onOpen: onAddProgramOpen, onClose: onAddProgramClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onOpen: onCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  if (loading || template == undefined) return <ProgressSpinner />;
  if (error) return <PageHeader>No Template Found</PageHeader>;

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: TEMPLATES_URL, name: 'Program Templates' },
    { href: '#', name: template?.name },
  ];

  return (
    <Box>
      <Box>
        <BreadcrumbBase values={breadcrumbInput} />
      </Box>
      <CenterColumnFlex>
        <Box mt="2">
          <CenterColumnFlex flexDir="column">
            <PageHeader>{template?.name}</PageHeader>
            <Flex pt={2}>
              <Box pr={2}>
                <Badge colorScheme="green" fontSize="0.8em">
                  {template?.noOfWeeks} Weeks
                </Badge>
              </Box>
              <Box>
                <Badge colorScheme="pink" fontSize="0.8em">
                  {template?.difficulty}
                </Badge>
              </Box>
            </Flex>
            <Box mt={5}>
              <PbPrimaryButton onClick={isAuthenticated ? onAddProgramOpen : onLoginOpen} leftIcon={<FaRunning />}>
                Create Program
              </PbPrimaryButton>
            </Box>
            {template?.activeUsersCount !== 0 && (
              <TextXsFade py={[4, 4, 2, 2]}>
                {template?.activeUsersCount} users are currently using this program{' '}
                <span role="img" aria-label="fire emoji">
                  🔥
                </span>
              </TextXsFade>
            )}
          </CenterColumnFlex>
          <Box pt={['8', '5', '4', '4']}>
            <Tabs variant="enclosed-colored" colorScheme="purple" align="center" size="md" isFitted>
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
          </Box>
          {isAddProgramOpen && (
            <ModalDrawerForm title="Create a New Program Log" isOpen={isAddProgramOpen} onClose={onAddProgramClose}>
              <CreateProgramLogFromTemplateForm onClose={onAddProgramClose} template={template!} onCreateSuccessOpen={onCreateSuccessOpen} />
            </ModalDrawerForm>
          )}
          {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
          {isCreateSuccessOpen && (
            <ModalForward
              isOpen={isCreateSuccessOpen}
              onClose={onCreateSuccessClose}
              onClick={() => history.push(WORKOUT_DIARY_URL)}
              body="Successfully created program using template, go to diary?"
              title="Success! 🎉🎉"
              actionText="Go to Diary"
            />
          )}
        </Box>
      </CenterColumnFlex>
    </Box>
  );
};

const TemplateWeekCard: React.FC<ITemplateWeek> = ({ templateDays }) => {
  return (
    <Card p={0}>
      <Flex flexDir={{ lg: 'row', md: 'row', sm: 'row', xs: 'column' }} flexWrap="wrap" justifyContent="center">
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

export default TemplateProgramDetailed;
