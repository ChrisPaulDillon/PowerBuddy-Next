import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Badge, Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure } from '@chakra-ui/core';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { GetAllTemplateProgramsUrl, GetTemplateProgramByIdUrl } from '../../api/public/template';
import { ITemplateProgram, ITemplateProgramExtended } from '../../interfaces/templates';
import { TEMPLATES_URL, WORKOUT_DIARY_URL } from '../../InternalLinks';
import { useSelector } from 'react-redux';
import { PbPrimaryButton } from '../../components/common/Buttons';
import { ModalDrawerForm } from '../../components/common/ModalDrawer';
import { ModalForward } from '../../components/common/Modals';
import { PageTitle, TextXsFade } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { LoginModal } from '../../components/shared/Modals';
import TemplateProgramCardList from '../../components/templatePrograms/TemplateProgramCardList';
import { IAppState } from '../../redux/store';
import CreateProgramLogFromScratchForm from '../../components/templatePrograms/forms/CreateProgramLogFromScratchForm';
import templates from '.';
import { useAxios } from '../../hooks/useAxios';
import { BreadcrumbBase, IBreadcrumbInput } from '../../components/common/Breadcrumbs';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import CreateProgramLogFromTemplateForm from '../../components/templatePrograms/forms/CreateProgramLogFromTemplateForm';
import { FaRunning } from 'react-icons/all';
import { TemplateWeekCard } from '../../components/templatePrograms/TemplateWeekCard';
import { PageContent, PageHeader } from '../../components/layout/Page';

const TemplateProgramSingle: NextPage = () => {
  const router = useRouter();
  const { templateProgramId } = router.query;

  const { isAuthenticated } = useSelector((state: IAppState) => state.state);

  const { loading, data: template, error } = useAxios<ITemplateProgramExtended>(GetTemplateProgramByIdUrl(parseInt(templateProgramId as string)));

  const { isOpen: isAddProgramOpen, onOpen: onAddProgramOpen, onClose: onAddProgramClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onOpen: onCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: TEMPLATES_URL, name: 'Program Templates' },
    { href: '#', name: template?.name },
  ];

  if (loading || template == undefined) return <ProgressSpinner />;
  if (error) return <PageTitle>No Template Found</PageTitle>;

  return (
    <Box>
      <PageHeader title={template?.name} />
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

export default TemplateProgramSingle;
