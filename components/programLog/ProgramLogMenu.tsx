//@ts-nocheck
import React, { useRef, useState } from 'react';
import { MenuButton, MenuList, Menu, MenuItem, Box, useDisclosure } from '@chakra-ui/core';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { PbDrawer } from '../common/Drawers';
import AddProgramDayForm from './forms/AddProgramDayForm';
import { FcCalendar } from 'react-icons/fc';
import { MdWarning } from 'react-icons/md';
import { TextSm } from '../common/Texts';
import DeleteProgramLogAlert from './alerts/DeleteProgramLogAlert';
import PbAlert from './../common/PbAlert';
import theme from '../../theme';
import { useColorMode } from '@chakra-ui/core';

const ProgramLogMenu = ({ programLogId }: any) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [deleteLogAlert, setDeleteLogAlert] = useState<boolean | undefined>();
  const menuRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Box ref={menuRef} p="1">
      <Menu placement="left">
        <MenuButton
          as={BsFillGrid3X3GapFill}
          size="1.5em"
          onClick={() => setMenuOpen(!menuOpen)}
          color={theme.colors.iconColor[colorMode]}></MenuButton>
        <MenuList isOpen={menuOpen}>
          <MenuItem onClick={onOpen}>
            <Box as={FcCalendar}></Box>
            <TextSm ml="1">Add New Day</TextSm>
          </MenuItem>
          <MenuItem onClick={() => setDeleteLogAlert(true)}>
            <Box as={MdWarning}></Box>
            <TextSm ml="1">Delete Program Log</TextSm>
          </MenuItem>
        </MenuList>
      </Menu>
      <PbDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} title="Add a new Program Log Day">
        <AddProgramDayForm />
      </PbDrawer>
      <PbAlert title="Delete Program Log?" isOpen={deleteLogAlert} setClose={setDeleteLogAlert}>
        <DeleteProgramLogAlert setDeleteLogAlert={() => setDeleteLogAlert()} programLogId={programLogId} />
      </PbAlert>
    </Box>
  );
};

export default ProgramLogMenu;
