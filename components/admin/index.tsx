import React, { useState } from 'react';
import { CenterColumnFlex } from '../layout/Flexes';
import { TabList, TabPanels, TabPanel, Tabs, Tab, useDisclosure } from '@chakra-ui/react';
import ExerciseList from './ExerciseList';
import AdminModalExerciseFactory, { AdminModalEnum } from './factories/AdminModalExerciseFactory';
import { PrimaryButton } from '../common/Buttons';

const AdminIndexPage = () => {
  const [modalOption, setModalOption] = useState<AdminModalEnum>(AdminModalEnum.None);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = (modalOption: AdminModalEnum) => {
    setModalOption(modalOption);
    onOpen();
  };

  return (
    <CenterColumnFlex>
      <Tabs variant="soft-rounded" colorScheme="green" align="center">
        <TabList>
          <Tab>Exercise Management</Tab>
          <Tab>User Management</Tab>
          <Tab>Template Management</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PrimaryButton onClick={() => openModal(AdminModalEnum.CreateExercise)}>Create Exercise</PrimaryButton>
            <ExerciseList />
          </TabPanel>
          <TabPanel>Not Yet Available</TabPanel>
          <TabPanel>
            <PrimaryButton onClick={() => openModal(AdminModalEnum.CreateTemplate)}>Create Template</PrimaryButton>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <AdminModalExerciseFactory isOpen={isOpen} onClose={onClose} modalType={modalOption} />
    </CenterColumnFlex>
  );
};

export default AdminIndexPage;
