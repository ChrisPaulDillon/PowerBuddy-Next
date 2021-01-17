import React, { useState } from 'react';
import { Box, Flex, useColorMode, Stack, useDisclosure, Avatar, useToken, useToast, IconButton } from '@chakra-ui/core';
import { Banner } from '../common/Texts';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import { MobileSideNav } from './LeftNav';
import useScreenSizes from '../../hooks/useScreenSizes';
import RightNav from './RightMenu';
import { PbDrawerForm } from '../common/Drawers';
import { LoginModal } from '../shared/Modals';
import MenuBase from '../common/Menus';
import { PbPrimaryButton } from '../common/Buttons';
import { RiAdminLine, FaHistory, FaUserFriends, BsFillGrid3X3GapFill, BsCalendarFill, MdMenu } from 'react-icons/all';
import { WORKOUT_DIARY_URL, TEMPLATES_URL, LOGHISTORY_URL, USERS_URL, ADMIN_URL } from '../../InternalLinks';
import { IconType } from 'react-icons';
import PbIconButton from '../common/IconButtons';
import Axios from 'axios';
import { CreateWorkoutDayUrl, GetWorkoutDayIdByDateUrl } from '../../api/account/workoutDay';
import { ModalBackForward, ModalForward } from '../common/Modals';
import TemplateSearchBar from '../templatePrograms/TemplateSearchBar';
import theme from '../../theme';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ICreateWorkoutDayOptions } from 'powerbuddy-shared';
import { isMobile } from 'react-device-detect';

const sideMenu = {
  groups: [
    // {
    //   name: 'Diary',
    //   icon: BsCalendarFill,
    //   link: DIARY_URL,
    //   tooltip: 'View Your Program Log',
    //   memberStatusId: 0,
    // },
    {
      name: 'New Diary',
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

interface INavBarProps {
  menuOpen: boolean;
  setMenuOpen: any;
}

const NavBar: React.FC<INavBarProps> = ({ menuOpen }) => {
  const { user } = useSelector((state: IAppState) => state.state);
  const router = useRouter();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { SCREEN_MOBILE, SCREEN_DESKTOP } = useScreenSizes();
  const { isAuthenticated } = useSelector((state: IAppState) => state.state);

  const [programText, setProgramText] = useState<string>();
  const [workoutOptions, setWorkoutOptions] = useState<ICreateWorkoutDayOptions>({ workoutDate: new Date() } as ICreateWorkoutDayOptions);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const { isOpen: isCreateWorkoutOpen, onOpen: onCreateWorkoutOpen, onClose: onCreateWorkoutClose } = useDisclosure();
  const { isOpen: isTodayWorkoutOpen, onOpen: onTodayWorkoutOpen, onClose: onTodayWorkoutClose } = useDisclosure();
  const { isOpen: isLeftNavOpen, onOpen: onLeftNavOpen, onClose: onLeftNavClose } = useDisclosure();
  const { isOpen: isMobileOpen, onOpen: onMobileOpen, onClose: onMobileClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  const handleBurgerMenuPress = () => {
    if (SCREEN_MOBILE) {
      onLeftNavOpen();
    } else {
      onLeftNavOpen();
    }
  };

  const doesUserHaveWorkoutToday = async () => {
    setButtonLoading(true);
    try {
      const result = await Axios.get(GetWorkoutDayIdByDateUrl());
      if (result.data.workoutDayId !== 0) {
        router.push(`${WORKOUT_DIARY_URL}/${result.data.workoutDayId}`);
      } else if (!result.data.workoutLogId) {
        onTodayWorkoutOpen(); //No workout log was found, give options of fresh create
      } else {
        const workoutOptions: ICreateWorkoutDayOptions = {
          workoutDate: new Date(),
          workoutLogId: result.data.workoutLogId,
          weekNo: result.data.weekNo,
        };
        setWorkoutOptions(workoutOptions);
        setProgramText(result?.data?.templateName);
        onCreateWorkoutOpen(); //Workout log was found, give the option to create a workout day for that log
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        onLoginOpen();
      }
    }
    setButtonLoading(false);
  };

  const createWorkoutDay = async () => {
    setButtonLoading(true);
    try {
      const result = await Axios.post(CreateWorkoutDayUrl(), workoutOptions);
      if (result.data !== 0) {
        router.push(`${WORKOUT_DIARY_URL}/${result.data.workoutDayId}`);
        toast({
          title: 'Success',
          description: 'Successfully created todays workout!',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        onLoginOpen();
      }
    }
    setButtonLoading(false);
    onTodayWorkoutClose();
    onCreateWorkoutClose();
  };

  return (
    <Flex as="nav" w="100%" justifyContent="flex" alignItems="space-between" minH="6vh" position="relative" rounded="lg" top={0}>
      <Stack isInline w="100%" justify="space-between" align="center">
        <Flex ml="1">
          <Box mt={1}>
            <IconButton
              icon={<MdMenu />}
              size="md"
              onClick={handleBurgerMenuPress}
              color={theme.colors.iconColor[colorMode]}
              aria-label=""
              isRound
              fontSize="1.25em"
              variant="ghost"
            />
          </Box>
          <Banner mx={2} mt={1}>
            PowerBuddy
          </Banner>
          <Box mt={2} mx={2}>
            <PbPrimaryButton
              size={isMobile || SCREEN_MOBILE ? 'xs' : 'sm'}
              variant="outline"
              onClick={async () => doesUserHaveWorkoutToday()}
              loading={buttonLoading}>
              Todays Workout
            </PbPrimaryButton>
          </Box>

          {/* <IconButton
            icon={<MdMenu />}
            size="md"
            onClick={handleBurgerMenuPress}
            color={theme.colors.iconColor[colorMode]}
            aria-label=""
            isRound
            fontSize="1.5em"
            variant="ghost"
            ml={4}
            mt={1}
          />*/}
        </Flex>
        <Flex>
          <Box mt={2} display={SCREEN_MOBILE ? 'none' : 'inherit'}>
            <TemplateSearchBar />
          </Box>
          {SCREEN_MOBILE ? (
            <Box px={2}>
              <Avatar size="sm" name={user.userName!} onClick={isAuthenticated ? onMobileOpen : onLoginOpen} />
              <PbDrawerForm isOpen={isMobileOpen} onClose={onMobileClose} size="full" title={user.userName!}>
                <RightNav userName={user.userName!} onClose={onMobileClose} />
              </PbDrawerForm>
            </Box>
          ) : isAuthenticated ? (
            <MenuBase button={<Avatar size="md" name={user.userName!} />}>
              <RightNav userName={user.userName!} onClose={onMobileClose} />
            </MenuBase>
          ) : (
            <Avatar size="md" name={user.userName!} onClick={onLoginOpen} />
          )}
        </Flex>
      </Stack>
      {isLoginOpen && <LoginModal isOpen={isLoginOpen} onOpen={onLoginOpen} onClose={onLoginClose} />}
      {isLeftNavOpen && <MobileSideNav isOpen={isLeftNavOpen} onClose={onLeftNavClose} />}
      {isTodayWorkoutOpen && (
        <ModalBackForward
          isOpen={isTodayWorkoutOpen}
          onClose={onTodayWorkoutClose}
          forwardText="Create Single"
          backText="Create Using Template"
          body="Create one using a weightlifting program or a one off workout"
          title="No Workout Detected"
          loading={buttonLoading}
          onForwardClick={async () => createWorkoutDay()}
          onBackClick={() => {
            router.push(TEMPLATES_URL);
            onTodayWorkoutClose();
          }}
        />
      )}
      {isCreateWorkoutOpen && (
        <ModalForward
          isOpen={isCreateWorkoutOpen}
          onClose={onCreateWorkoutClose}
          actionText="Add"
          body={`You are currently running the program ${programText}, add this workout to this program?`}
          title="No Workout Detected"
          loading={buttonLoading}
          onClick={async () => createWorkoutDay()}
        />
      )}
    </Flex>
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

export const LeftNavItem: React.FC<INavItemProps> = ({ Icon, link, tooltip, memberStatusId, userMemberStatusId }) => {
  return (
    <Box ml={2}>
      {userMemberStatusId >= memberStatusId && (
        <Stack spacing={1} isInline w="80%" py="0.5em" justify="space-between">
          <Link href={link}>
            <PbIconButton Icon={Icon} size="sm" label={tooltip} color="gray.100" onClick={() => undefined} />
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default NavBar;
