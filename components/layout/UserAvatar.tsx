//@ts-nocheck
import React from 'react';
import { Avatar, Link } from '@chakra-ui/core';
import { PbToolTip } from '../common/ToolTips';
import { Link as RouterLink } from 'react-router-dom';

const UserAvatar = ({ userName, ...rest }: any) => {
  const profileLink = `/u/${userName}`;
  return (
    <Link as={RouterLink} to={profileLink}>
      <PbToolTip label={userName}>
        <Avatar size="md" borderWidth={2} name={userName} {...rest} />
      </PbToolTip>
    </Link>
  );
};

export default UserAvatar;
