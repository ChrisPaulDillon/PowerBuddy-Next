import React from 'react';
import { Avatar } from '@chakra-ui/core';
import { PbToolTip } from '../common/ToolTips';
import { PROFILE_URL } from '../../InternalLinks';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UserAvatar = ({ userName, ...rest }: any) => {
  const router = useRouter();
  const profileLink = `${PROFILE_URL}/${userName}`;
  return (
    <Link href={profileLink}>
      <PbToolTip label={userName}>
        <Avatar size="md" borderWidth={2} name={userName} {...rest} onClick={() => router.push(profileLink)} />
      </PbToolTip>
    </Link>
  );
};

export default UserAvatar;
