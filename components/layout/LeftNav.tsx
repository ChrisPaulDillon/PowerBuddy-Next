import React from 'react';
import { Box, Flex, useColorMode, Stack, Button, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Drawer, Divider } from '@chakra-ui/core';
import { BsFillGrid3X3GapFill, BsCalendarFill } from 'react-icons/bs';
import { RiAdminLine, FaHistory, FaUserFriends } from 'react-icons/all';
import theme from '../../theme';
import { PbToolTip } from '../common/ToolTips';
import { IconType } from 'react-icons/lib';
import { CenterColumnFlex } from './Flexes';
import { useSelector } from 'react-redux';
import { Banner } from '../common/Texts';
import { MdMenu } from 'react-icons/md';
import { IAppState } from '../../redux/store';
import useScreenSizes from '../../hooks/useScreenSizes';
import { ADMIN_URL, USERS_URL, LOGHISTORY_URL, TEMPLATES_URL, WORKOUT_DIARY_URL } from '../../InternalLinks';
import PbIconButton from '../common/IconButtons';
import { MenuItem } from '../common/Menus';
import Link from 'next/link';

const sideMenu = {
  groups: [
    {
      name: 'Diary',
      icon: BsCalendarFill,
      link: '/',
      tooltip: 'View Your Program Log',
      memberStatusId: 0,
    },
    {
      name: 'Templates',
      icon: BsFillGrid3X3GapFill,
      link: TEMPLATES_URL,
      tooltip: 'View Program Templates',
      memberStatusId: 0,
    },
    {
      name: 'History',
      icon: FaHistory,
      link: LOGHISTORY_URL,
      tooltip: 'View Your log history',
      memberStatusId: 0,
    },
    {
      name: 'Users',
      icon: FaUserFriends,
      link: USERS_URL,
      tooltip: 'View Active Users',
      memberStatusId: 0,
    },
    {
      name: 'Admin',
      icon: RiAdminLine,
      link: ADMIN_URL,
      tooltip: 'Admin Panel',
      memberStatusId: 4,
    },
  ],
};

export const MobileSideNav = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" fontWeight="normal">
            {' '}
            <Flex mt={1}>
              <PbIconButton Icon={MdMenu} label="" onClick={onClose} color={theme.colors.iconColor[colorMode]} fontSize="1em" />
              <Banner ml={2}>PowerBuddy</Banner>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <LeftMenuItems menuOpen={isOpen} onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

interface ISideNavProps {
  menuOpen: boolean;
}

const LeftNav: React.FC<ISideNavProps> = ({ menuOpen, ...props }) => {
  const { colorMode } = useColorMode();
  const { SCREEN_DESKTOP } = useScreenSizes();

  return (
    <Box>
      {SCREEN_DESKTOP && (
        <Flex
          as="nav"
          position="relative"
          zIndex={999}
          top={0}
          left="0%"
          bg={theme.colors.navBackground[colorMode]}
          display={{ lg: 'inline', md: 'inline', sm: 'none', xs: 'none' }}
          borderColor={theme.colors.borderColor[colorMode]}
          h="100%"
          minW="75px"
          {...props}>
          <LeftMenuItems menuOpen={menuOpen} />
        </Flex>
      )}
    </Box>
  );
};

interface ILeftMenuItemsProps {
  menuOpen: boolean;
  onClose?: () => void;
}

const LeftMenuItems: React.FC<ILeftMenuItemsProps> = ({ menuOpen, onClose }) => {
  const { user } = useSelector((state: IAppState) => state.state);
  return (
    <Box>
      {sideMenu.groups.map((item, idx) => (
        <Box key={idx}>
          <LeftNavItem
            name={item.name}
            Icon={item.icon}
            tooltip={item.tooltip}
            link={item.link}
            memberStatusId={item.memberStatusId}
            userMemberStatusId={user.memberStatusId ?? 0}
            isOpen={menuOpen}
            onClose={onClose}
            idx={idx}
          />
          {idx !== sideMenu.groups.length - 2 && menuOpen && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

interface INavItemProps {
  name: string;
  Icon: IconType;
  link: string;
  tooltip: string;
  memberStatusId: number;
  userMemberStatusId: number;
  onClose?: () => void;
  isOpen: boolean;
  idx: number;
}

export const LeftNavItem: React.FC<INavItemProps> = ({ name, Icon, link, tooltip, memberStatusId, userMemberStatusId, onClose, isOpen, idx }) => {
  const { colorMode } = useColorMode();
  return (
    <Box key={idx}>
      {isOpen && userMemberStatusId >= memberStatusId ? (
        <>
          <Box w="100%">
            <PbToolTip label={tooltip}>
              <Link href={link}>
                <MenuItem title={name} Icon={Icon} color={theme.colors.navIconColor[colorMode]} onClick={onClose} />
              </Link>
            </PbToolTip>
          </Box>
        </>
      ) : (
        <Box ml={2}>
          {userMemberStatusId >= memberStatusId && (
            <Stack spacing={1} isInline w="80%" py="0.5em" justify="space-between">
              <Link href={link}>
                <PbIconButton Icon={Icon} size="sm" label={tooltip} color={theme.colors.navIconColor[colorMode]} onClick={() => undefined} />
              </Link>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
};

export default LeftNav;
