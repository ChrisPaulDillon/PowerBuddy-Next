import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, useDisclosure } from '@chakra-ui/core';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { GetAllTemplateProgramsUrl } from '../../api/public/template';
import { ITemplateProgram } from '../../interfaces/templates';
import { WORKOUT_DIARY_URL } from '../../components/util/InternalLinks';
import { useSelector } from 'react-redux';
import { PbPrimaryButton } from '../../components/common/Buttons';
import { ModalDrawerForm } from '../../components/common/ModalDrawer';
import { ModalForward } from '../../components/common/Modals';
import { PageHeader } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { LoginModal } from '../../components/shared/Modals';
import TemplateProgramCardList from '../../components/templatePrograms/TemplateProgramCardList';
import { IAppState } from '../../redux/store';
import CreateProgramLogFromScratchForm from '../../components/templatePrograms/forms/CreateProgramLogFromScratchForm';

interface TemplatePageProps {
  initialEroticaItem?: any;
  status: number;
  namespacesRequired: string[];
}

const Index: NextPage = () => {
  const router = useRouter();

  const { isAuthenticated } = useSelector((state: IAppState) => state.state);

  const [templates, setTemplates] = useState<ITemplateProgram[]>([]);

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(GetAllTemplateProgramsUrl());
        setTemplates(data && data.data);
      } catch (err) {}
    };
    fetchData();
  }, []);

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

export default Index;
