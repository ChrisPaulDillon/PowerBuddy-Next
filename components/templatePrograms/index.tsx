import React, { useEffect, useState } from 'react';
import TemplateProgramCardList from './TemplateProgramCardList';
import { Box, Flex, useDisclosure } from '@chakra-ui/core';
import SearchBar from '../shared/SearchBar';
import useTemplateSearch from '../../hooks/templates/useTemplateSearch';
import { PageHeader, TextSm } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { PbPrimaryButton } from '../common/Buttons';
import ProgramGenerationFromScratchForm from './forms/CreateProgramLogFromScratchForm';
import { ITemplateProgram } from '../../interfaces/templates';
import { GetAllTemplateProgramsUrl } from '../../api/public/template';
import { useAxios } from '../../hooks/useAxios';
import ProgressSpinner from '../common/ProgressSpinner';
import { BsFillGrid3X3GapFill } from 'react-icons/all';
import { PbModalDrawerForm } from '../common/ModalDrawer';
import { IAppState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { LoginModal } from '../common/Modals';

const TemplateIndexPage = () => {
  const { loading, data } = useAxios<ITemplateProgram[]>(GetAllTemplateProgramsUrl());
  const [templates, setTemplates] = useState<ITemplateProgram[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredTemplates = useTemplateSearch(templates, searchTerm);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);

  useEffect(() => {
    if (data != null) setTemplates(data);
  }, [data]);

  if (loading) return <ProgressSpinner />;

  return (
    <Box>
      <CenterColumnFlex>
        <PageHeader Icon={BsFillGrid3X3GapFill} size="23px">
          Template Programs
        </PageHeader>
        <SearchBar onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a template..." />
        <Flex p="2">
          <TextSm mr="2">Can't find the program you want? </TextSm>{' '}
          <PbPrimaryButton size="xs" onClick={isAuthenticated ? onCreateOpen : onLoginOpen}>
            Start Fresh
          </PbPrimaryButton>
        </Flex>
      </CenterColumnFlex>
      <TemplateProgramCardList templates={filteredTemplates} />
      {isCreateOpen && (
        <PbModalDrawerForm title="Create a New Diary Log" isOpen={isCreateOpen} onClose={onCreateClose}>
          <ProgramGenerationFromScratchForm onClose={onCreateClose} />
        </PbModalDrawerForm>
      )}
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
    </Box>
  );
};

export default TemplateIndexPage;
