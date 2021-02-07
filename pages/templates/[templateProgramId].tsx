import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Badge, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { GetAllTemplateProgramsUrl, GetTemplateProgramByIdUrl } from '../../api/public/template';
import { ITemplateProgram, ITemplateProgramExtended } from 'powerbuddy-shared';
import { TEMPLATES_URL, WORKOUT_DIARY_URL } from '../../InternalLinks';
import { PbPrimaryButton } from '../../components/common/Buttons';
import { ModalDrawerForm } from '../../components/common/ModalDrawer';
import { ModalForward } from '../../components/common/Modals';
import { PageTitle, TextXsFade } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { LoginModal } from '../../components/shared/Modals';
import { useAxios } from '../../hooks/useAxios';
import { BreadcrumbBase, IBreadcrumbInput } from '../../components/common/Breadcrumbs';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import CreateProgramLogFromTemplateForm from '../../components/templatePrograms/forms/CreateProgramLogFromTemplateForm';
import { FaRunning } from 'react-icons/all';
import { TemplateWeekCard } from '../../components/templatePrograms/TemplateWeekCard';
import { PageContent, PageHead } from '../../components/layout/Page';
import { useUserContext } from '../../components/users/UserContext';
import axios from 'axios';

const TemplateProgramSingle: NextPage = ({ template }: any) => {
  const router = useRouter();
  const { isAuthenticated } = useUserContext();

  const { isOpen: isAddProgramOpen, onOpen: onAddProgramOpen, onClose: onAddProgramClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onOpen: onCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: TEMPLATES_URL, name: 'Program Templates' },
    { href: '#', name: template?.name },
  ];

  return (
    <Box>
      <PageHead
        title={template?.name}
        description={`Automatically generate program using the ${template.name} template. Calculate your stats for weightlifters, powerlifters and olympic weightlifters for free `}
      />
      <PageContent>
        <Box>
          <BreadcrumbBase values={breadcrumbInput} />
        </Box>
        <CenterColumnFlex>
          <Box mt="2">
            <CenterColumnFlex flexDir="column">
              <PageTitle>{template?.name}</PageTitle>
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
                  {template?.templateWeeks!.map((tw) => {
                    return <Tab>Week {tw.weekNo}</Tab>;
                  })}
                </TabList>
                <TabPanels>
                  {template?.templateWeeks!.map((tw) => {
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
                onClick={() => router.push(WORKOUT_DIARY_URL)}
                body="Successfully created program using template, go to diary?"
                title="Success! 🎉🎉"
                actionText="Go to Diary"
              />
            )}
          </Box>
        </CenterColumnFlex>
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
