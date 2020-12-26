import React from 'react';
import { Avatar } from '@chakra-ui/core';
import { PbToolTip } from '../common/ToolTips';
import { PROFILE_URL } from '../util/InternalLinks';
import Link from 'next/link';

const UserAvatar = ({ userName, ...rest }: any) => {
  const profileLink = `${PROFILE_URL}/${userName}`;
  return (
    <Link href={profileLink}>
      <PbToolTip label={userName}>
        <Avatar size="md" borderWidth={2} name={userName} {...rest} />
      </PbToolTip>
    </Link>
  );
};

export default UserAvatar;
