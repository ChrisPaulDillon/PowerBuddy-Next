import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Badge, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { GetAllTemplateProgramsUrl, GetTemplateProgramByIdUrl } from '../../api/public/template';
import { ITemplateProgram, ITemplateProgramExtended } from 'powerbuddy-shared';
import { HOME_URL, WORKOUT_DIARY_URL } from '../../InternalLinks';
import { PrimaryButton } from '../../components/common/Buttons';
import { ModalDrawerForm } from '../../components/common/ModalDrawers';
import { ModalForward } from '../../components/common/Modals';
import { PageTitle, TextXsFade } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { LoginModal } from '../../components/shared/Modals';
import { BreadcrumbBase, IBreadcrumbInput } from '../../components/common/Breadcrumbs';
import CreateProgramLogFromTemplateForm from '../../components/templatePrograms/forms/CreateProgramLogFromTemplateForm';
import { FaRunning } from 'react-icons/all';
import { TemplateWeekCard } from '../../components/templatePrograms/TemplateWeekCard';
import { PageContent, PageHead } from '../../components/layout/Page';
import { useUserContext } from '../../components/users/UserContext';
import axios from 'axios';
import { Box, Flex } from '../../chakra/Layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../../chakra/Disclosure';
import useScreenSizes from '../../hooks/useScreenSizes';

const TemplateProgramSingle: NextPage = ({ template }: any) => {
  const router = useRouter();
  const { isAuthenticated } = useUserContext();

  const { isOpen: isAddProgramOpen, onOpen: onAddProgramOpen, onClose: onAddProgramClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onOpen: onCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: HOME_URL, name: 'Weightlifting Programs' },
    { href: '#', name: template?.name },
  ];

  const { SCREEN_MOBILE } = useScreenSizes();

  return (
    <Box>
      <PageHead
        title={template?.name}
        description={`Automatically generate program using the ${template.name} template. Calculate your stats for weightlifters, powerlifters and olympic weightlifters for free `}
        keywords={`${template.name}, Workout Diary, PowerBuddy, Weightlifting App, Strong App, Intensity App, Powerlifting Weightlifting Templates, Liftvault Workout Program Spreadsheets, Powerlifting Routine, Olympic Weightlifting Template`}
      />
      <PageContent>
        <Box>
          <BreadcrumbBase values={breadcrumbInput} />
        </Box>
        <Box mt={[3, 3, 3, 3]}>
          <PageTitle>{template?.name}</PageTitle>
          <CenterColumnFlex>
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
              <PrimaryButton onClick={isAuthenticated ? onAddProgramOpen : onLoginOpen} leftIcon={<FaRunning />}>
                Create Program
              </PrimaryButton>
            </Box>
          </CenterColumnFlex>
          {template?.activeUsersCount !== 0 && (
            <TextXsFade py={[4, 4, 2, 2]}>
              {template?.activeUsersCount} users are currently using this program{' '}
              <span role="img" aria-label="fire emoji">
                🔥
              </span>
            </TextXsFade>
          )}
          <Box mt={['8', '5', '4', '4']}>
            <Tabs
              variant="soft-rounded"
              colorScheme="green"
              align={SCREEN_MOBILE ? 'start' : 'center'}
              size="sm"
              isTruncated
              orientation={SCREEN_MOBILE ? 'vertical' : 'horizontal'}>
              <TabList>
                {template?.templateWeeks.map((tw, idx) => {
                  return <Tab key={idx}>Week {tw.weekNo}</Tab>;
                })}
              </TabList>
              <TabPanels>
                {template?.templateWeeks.map((tw, idx) => {
                  return (
                    <TabPanel key={idx}>
                      <TemplateWeekCard {...tw} />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </Box>
          {isAddProgramOpen && (
            <ModalDrawerForm title="Create a New Program Log" isOpen={isAddProgramOpen} onClose={onAddProgramClose}>
              <CreateProgramLogFromTemplateForm onClose={onAddProgramClose} template={template} onCreateSuccessOpen={onCreateSuccessOpen} />
            </ModalDrawerForm>
          )}
          {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />}
          {isCreateSuccessOpen && (
            <ModalForward
              isOpen={isCreateSuccessOpen}
              onClose={onCreateSuccessClose}
              onClick={() => router.push(WORKOUT_DIARY_URL)}
              body="Successfully created program using template, go to diary?"
              title="Success! 🎉🎉"
              actionText="Go to Diary"
            />
          )}
        </Box>
      </PageContent>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get<ITemplateProgram[]>(GetAllTemplateProgramsUrl());

  const paths = res.data.map((template) => ({
    params: { templateProgramId: template.templateProgramId.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const templateProgramId = params.templateProgramId as string;
  const res = await axios.get<ITemplateProgramExtended>(GetTemplateProgramByIdUrl(parseInt(templateProgramId)));

  return { props: { template: res.data } };
};

export default TemplateProgramSingle;
