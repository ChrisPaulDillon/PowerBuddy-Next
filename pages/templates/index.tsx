import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Flex, useDisclosure } from '@chakra-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetAllTemplateProgramsUrl } from '../../api/public/template';
import { ITemplateProgram } from 'powerbuddy-shared';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { PbPrimaryButton } from '../../components/common/Buttons';
import { ModalDrawerForm } from '../../components/common/ModalDrawer';
import { ModalForward } from '../../components/common/Modals';
import { PageTitle } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { LoginModal } from '../../components/shared/Modals';
import TemplateProgramCardList from '../../components/templatePrograms/TemplateProgramCardList';
import CreateProgramLogFromScratchForm from '../../components/templatePrograms/forms/CreateProgramLogFromScratchForm';
import { PageContent, PageHead } from '../../components/layout/Page';
import { useUserContext } from '../../components/users/UserContext';

const Index: NextPage = ({ templates }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const { isAuthenticated } = useUserContext();

  //const [templates, setTemplates] = useState<ITemplateProgram[]>([]);

  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isCreateSuccessOpen, onClose: onCreateSuccessClose } = useDisclosure();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await axios.get(GetAllTemplateProgramsUrl());
  //       setTemplates(data && data.data);
  //     } catch (err) {}
  //   };
  //   fetchData();
  // }, []);

  return (
    <Box>
      <PageHead
        title="Weightlifting Programs"
        description="View PowerBuddy Weightlifting Powerlifting programs, training templates such as 5/3/1 boring but big"
      />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>Weightlifting Programs</PageTitle>
          <Flex py={4} ml={3}>
            <Box mt={2} px={2}>
              <PbPrimaryButton size="xs" onClick={isAuthenticated ? onCreateOpen : onLoginOpen}>
                Or Start Fresh
              </PbPrimaryButton>
            </Box>
          </Flex>
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
      </PageContent>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts
  const response = await fetch(GetAllTemplateProgramsUrl());
  const data = await response.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      templates: data,
    },
  };
};

export default Index;
