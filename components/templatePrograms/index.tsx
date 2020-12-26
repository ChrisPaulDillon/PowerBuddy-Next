import React, { useEffect, useState } from 'react';
import TemplateProgramCardList from './TemplateProgramCardList';
import { Box, Flex, useDisclosure } from '@chakra-ui/core';
import { PageHeader } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { PbPrimaryButton } from '../common/Buttons';
import { ITemplateProgram } from '../../interfaces/templates';
import { GetAllTemplateProgramsUrl } from '../../api/public/template';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import { ModalDrawerForm } from '../common/ModalDrawer';
import { IAppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { LoginModal } from '../shared/Modals';
import { ModalForward } from '../common/Modals';
import { WORKOUT_DIARY_URL } from '../util/InternalLinks';
import { useRouter } from 'next/router';
import CreateProgramLogFromScratchForm from './forms/CreateProgramLogFromScratchForm';

const TemplateIndexPage = () => {
  const router = useRouter();
  const { data, loading } = useAxios<ITemplateProgram[]>(GetAllTemplateProgramsUrl());
  // const { data: calendarData, loading: calendarLoading } = useAxios<IProgramLogCalendarStats>(GetAllProgramLogCalendarStatsQueryUrl());
  const [templates, setTemplates] = useState<ITemplateProgram[]>([]);
  const [] = useState<string>('');
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);
  const [] = useState<any>('');

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  useEffect(() => {
    if (data != null) setTemplates(data);
  }, [data]);

  // useEffect(() => {
  //   if (templateKeyVal.length > 0) {
  //     setSearchResultList(templateKeyVal.map((x) => ({ value: x.templateProgramId, label: x.templateName })));
  //   }
  // }, [templateKeyVal]);

  if (loading) return <ProgressSpinner />;

  return (
    <Box>
      <Flex w="100%" flexDir="column">
        <PageHeader>Weightlifting Programs</PageHeader>
        <Flex py={4} ml={3}>
          <Box mt={2} px={2}>
            <PbPrimaryButton size="xs" onClick={isAuthenticated ? onCreateOpen : onLoginOpen}>
              Or Start Fresh
            </PbPrimaryButton>
          </Box>
        </Flex>
      </Flex>
      <CenterColumnFlex>
        <CenterColumnFlex p={4} my={['6', '5', '4', '4']} justify="center" w="100%"></CenterColumnFlex>
      </CenterColumnFlex>
      <TemplateProgramCardList templates={templates} />
      {isCreateOpen && (
        <ModalDrawerForm title="Create a New Diary Log" isOpen={isCreateOpen} onClose={onCreateClose}>
          <CreateProgramLogFromScratchForm
            onClose={onCreateClose}
            // workoutDates={calendarData!.workoutDates!}
            onCreateSuccessOpen={onCreateSuccessClose}
          />
        </ModalDrawerForm>
      )}
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
      {isCreateSuccessOpen && (
        <ModalForward
          isOpen={isCreateSuccessOpen}
          onClose={onCreateSuccessClose}
          onClick={() => router.push(WORKOUT_DIARY_URL)}
          body="Successfully created custom program, go to diary?"
          title="Success! 🎉🎉"
          actionText="Go to Diary"
        />
      )}
    </Box>
  );
};

export default TemplateIndexPage;
