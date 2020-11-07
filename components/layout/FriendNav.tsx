//@ts-nocheck
import React from 'react';
import { Box, useColorMode, Link, Stack } from '@chakra-ui/core';
import theme from '../../theme';
import { Link as RouterLink } from 'react-router-dom';
import { PbToolTip } from '../common/ToolTips';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import UserAvatar from './UserAvatar';

const FriendNav = ({ ...props }) => {
  const { colorMode } = useColorMode();
  const { userFriendsList } = useSelector((state: IAppState) => state.state);
  const { userFriendRequests } = useSelector((state: IAppState) => state.state);
  return (
    <Box
      position="relative"
      //   zIndex={900}
      top={0}
      borderBottomWidth={1}
      //   borderLeftWidth={1}
      right="0%"
      mr="2"
      bg={theme.colors.background[colorMode]}
      display={{ lg: 'inline', md: 'inline', sm: 'none', xs: 'none' }}
      {...props}>
      {/* {sideMenu.groups.map((item, idx) => (
       
      ))} */}
    </Box>
  );
};

export default FriendNav;
