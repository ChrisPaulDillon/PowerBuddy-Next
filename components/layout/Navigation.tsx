import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsFillGrid3X3GapFill, BsCalendarFill } from 'react-icons/bs';
import { FaHistory, FaUserFriends } from 'react-icons/fa';
import { HOME_URL, WORKOUT_DIARY_URL, LOGHISTORY_URL, USERS_URL } from '../../InternalLinks';
import { IconType } from 'react-icons/lib';
import { useRouter } from 'next/router';
import { Flex } from '../../chakra/Layout';

const menuItems = {
  groups: [
    {
      name: 'Templates',
      icon: BsFillGrid3X3GapFill,
      link: HOME_URL,
      tooltip: 'View Program Templates',
      memberStatusId: 0,
    },
    {
      name: 'Diary',
      icon: BsCalendarFill,
      link: WORKOUT_DIARY_URL,
      tooltip: 'View Your Diary',
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
    // {
    //   name: 'Admin',
    //   icon: RiAdminLine,
    //   link: ADMIN_URL,
    //   tooltip: 'Admin Panel',
    //   memberStatusId: 4,
    // },
  ],
};

const Navigation = () => {
  return (
    <Flex justify="center" p={2}>
      {' '}
      {menuItems.groups.map((item, idx) => (
        <Box key={idx}>
          <NavigationItem
            name={item.name}
            Icon={item.icon}
            toolTip={item.tooltip}
            link={item.link}
            memberStatusId={item.memberStatusId}
            userMemberStatusId={item.memberStatusId ?? 0}
          />
        </Box>
      ))}
    </Flex>
  );
};

interface NavigationItemProps {
  name: string;
  Icon: IconType;
  toolTip: string;
  link: string;
  memberStatusId: number;
  userMemberStatusId: number;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ name, Icon, link, toolTip, memberStatusId, userMemberStatusId }) => {
  const router = useRouter();
  return (
    <IconButton
      aria-label={toolTip}
      onClick={() => router.push(link)}
      icon={<Icon />}
      size="8xl"
      fontSize="25px"
      mx={2}
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      }}
      isRound
      boxShadow="md"
      //   color="red.600"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
    />
  );
};

export default Navigation;
