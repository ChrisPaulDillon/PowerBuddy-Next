//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Link,
  Tooltip,
  Stack,
  Button,
  Icon,
  Divider,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Drawer,
} from '@chakra-ui/core';
import { BsBarChartFill, BsFillGrid3X3GapFill, BsCalendarFill } from 'react-icons/bs';
import { RiAdminLine, GiRun, FaHistory, FaHome, FaUserFriends, BiDumbbell, IoMdTrophy } from 'react-icons/all';
import theme from '../../theme';
import { NavLink as RouterLink } from 'react-router-dom';
import { PbToolTip } from '../common/ToolTips';
import { TextSm, TextXs } from '../common/Texts';
import { IconType } from 'react-icons/lib';
import { CenterColumnFlex } from './Flexes';
import UserAvatar from './UserAvatar';
import { useSelector } from 'react-redux';
import { Banner } from '../common/Texts';
import { MdMenu } from 'react-icons/md';
import { PbStack } from '../common/Stacks';
import { IAppState } from './../../redux/store';
import useScreenSizes from '../../hooks/useScreenSizes';

const sideMenu = {
  groups: [
    {
      name: 'Diary',
      icon: BsCalendarFill,
      link: '/diary',
      tooltip: 'View Your Program Log',
      memberStatusId: 0,
    },
    // {
    //   name: 'Stats',
    //   icon: BsBarChartFill,
    //   link: '/liftingstats',
    //   tooltip: 'View your lifetime stats',
    //   memberStatusId: 1,
    // },
    {
      name: 'Personal Bests',
      icon: IoMdTrophy,
      link: '/personalbests',
      tooltip: 'View your Lifting Stats',
      memberStatusId: 0,
    },
    {
      name: 'Templates',
      icon: BsFillGrid3X3GapFill,
      link: '/templates',
      tooltip: 'View Program Templates',
      memberStatusId: 0,
    },
    {
      name: 'History',
      icon: FaHistory,
      link: '/loghistory',
      tooltip: 'View Your log history',
      memberStatusId: 0,
    },
    {
      name: 'Friends',
      icon: FaUserFriends,
      link: '/friends',
      tooltip: 'View Your Friends List',
      memberStatusId: 0,
    },
    // {
    //   name: 'Exercises',
    //   icon: GiRun,
    //   link: '/exercises',
    //   tooltip: 'View Exercises',
    //   memberStatusId: 1,
    // },
    {
      name: 'Admin',
      icon: RiAdminLine,
      link: '/admin',
      tooltip: 'Admin Panel',
      memberStatusId: 4,
    },
  ],
};

export const MobileSideNav = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: IAppState) => state.state);
  const { userFriendsList } = useSelector((state: IAppState) => state.state);
  const { userFriendRequests } = useSelector((state: IAppState) => state.state);
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" fontWeight="normal">
            {' '}
            <Flex>
              <IconButton
                icon={<MdMenu />}
                size="md"
                onClick={onClose}
                color={theme.colors.iconColor[colorMode]}
                aria-label=""
                isRound
                fontSize="1.5em"
                variant="ghost"
                mt="1"
              />
              <Banner ml="2">PowerBuddy</Banner>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <CenterColumnFlex>
              {/* //menu items */}
              {sideMenu.groups.map((item, idx) => (
                <Box w="100%">
                  <OpenNavItem
                    name={item.name}
                    Icon={item.icon}
                    tooltip={item.tooltip}
                    link={item.link}
                    memberStatusId={item.memberStatusId}
                    userMemberStatusId={user.memberStatusId ?? 0}
                    onClose={onClose}
                  />
                </Box>
              ))}
              <Divider />
              {userFriendRequests!.map((x) => (
                <Box key={x.friendRequestId}>
                  <OpenedFriendNavItem userName={x.userName} />
                </Box>
              ))}
              {userFriendsList!.map((x) => (
                <Box key={x.friendsListId}>
                  <OpenedFriendNavItem userName={x.userName} />
                </Box>
              ))}
              {/* friends list */}
            </CenterColumnFlex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

interface ISideNavProps {
  menuOpen: boolean;
}

const SideNav: React.FC<ISideNavProps> = ({ menuOpen, ...props }) => {
  const { user } = useSelector((state: IAppState) => state.state);
  const { userFriendsList } = useSelector((state: IAppState) => state.state);
  const { userFriendRequests } = useSelector((state: IAppState) => state.state);
  const { colorMode } = useColorMode();
  const { SCREEN_DESKTOP } = useScreenSizes();

  return (
    <Box>
      {SCREEN_DESKTOP && (
        <Box
          position="relative"
          zIndex={999}
          top={0}
          borderRightWidth={1}
          left="0%"
          bg={theme.colors.navBackground[colorMode]}
          display={{ lg: 'inline', md: 'inline', sm: 'none', xs: 'none' }}
          borderColor={theme.colors.borderColor[colorMode]}
          {...props}>
          <CenterColumnFlex>
            {/* //menu items */}
            {menuOpen
              ? sideMenu.groups.map((item, idx) => (
                  <Box>
                    <OpenNavItem
                      name={item.name}
                      Icon={item.icon}
                      tooltip={item.tooltip}
                      link={item.link}
                      memberStatusId={item.memberStatusId}
                      userMemberStatusId={user.memberStatusId ?? 0}
                    />
                  </Box>
                ))
              : sideMenu.groups.map((item, idx) => (
                  <Box>
                    <ClosedNavItem
                      name={item.name}
                      Icon={item.icon}
                      tooltip={item.tooltip}
                      link={item.link}
                      memberStatusId={item.memberStatusId}
                      userMemberStatusId={user.memberStatusId ?? 0}
                    />
                  </Box>
                ))}
            <Divider />
            {/* {userFriendRequests.length > 0 ? (
          <TextSm>PENDING FRIEND REQUESTS</TextSm>
        ) : null} */}
            {!menuOpen ? (
              <CenterColumnFlex>
                {userFriendRequests.length > 0 && <TextXs textAlign="center">Pending</TextXs>}
                {userFriendRequests!.map((x) => (
                  <Box key={x.friendRequestId}>
                    <ClosedFriendNavItem userName={x.userName} />
                  </Box>
                ))}
                <Divider />
                {userFriendsList!.map((x) => (
                  <Box key={x.friendsListId}>
                    <ClosedFriendNavItem userName={x.userName} />
                  </Box>
                ))}
              </CenterColumnFlex>
            ) : (
              <Box>
                <TextXs textAlign="center">Friends</TextXs>
                {userFriendRequests!.map((x) => (
                  <Box key={x.friendRequestId}>
                    <OpenedFriendNavItem userName={x.userName} />
                  </Box>
                ))}
                <Divider />
                {userFriendsList!.map((x) => (
                  <Box key={x.friendsListId}>
                    <OpenedFriendNavItem userName={x.userName} />
                  </Box>
                ))}
              </Box>
            )}
          </CenterColumnFlex>
        </Box>
      )}
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
  onClose?: any;
}

export const OpenNavItem: React.FC<INavItemProps> = ({ name, Icon, link, tooltip, memberStatusId, userMemberStatusId, onClose }) => {
  return (
    <Box>
      {userMemberStatusId >= memberStatusId && (
        <Stack spacing={1} isInline w="80%" py="0.5em" justify="space-between">
          <PbToolTip label={tooltip}>
            <Link as={RouterLink} to={link}>
              <Button variant="ghost" size="sm" leftIcon={<Icon />} onClick={onClose}>
                <TextSm minW="80px">{name}</TextSm>
              </Button>
            </Link>
          </PbToolTip>
        </Stack>
      )}
    </Box>
  );
};

export const ClosedNavItem: React.FC<INavItemProps> = ({ name, Icon, link, tooltip, memberStatusId, userMemberStatusId }) => (
  <Box>
    {userMemberStatusId >= memberStatusId && (
      <Stack spacing={1} isInline w="80%" py="0.5em" justify="space-between">
        <Link as={RouterLink} to={link}>
          <PbToolTip label={tooltip}>
            <Button variant="ghost" size="md">
              <CenterColumnFlex>
                <Box as={Icon} size="1em" variant="ghost" mr="1" isRound />
                <TextXs pt="1">{name}</TextXs>
              </CenterColumnFlex>
            </Button>
          </PbToolTip>
        </Link>
      </Stack>
    )}
  </Box>
);

const ClosedFriendNavItem = ({ userName }) => {
  return (
    <Stack spacing={1} isInline py="0.5em" justify="space-between">
      <CenterColumnFlex>
        <UserAvatar userName={userName} size="sm" />
        <TextXs pt="1">{userName}</TextXs>
      </CenterColumnFlex>
    </Stack>
  );
};

const OpenedFriendNavItem = ({ userName }) => {
  return (
    <Stack spacing={1} isInline w="100%" py="0.5em" justify="space-between">
      <PbStack>
        <UserAvatar userName={userName} size="sm" />
        <TextSm>{userName}</TextSm>
      </PbStack>
    </Stack>
  );
};

export default SideNav;
