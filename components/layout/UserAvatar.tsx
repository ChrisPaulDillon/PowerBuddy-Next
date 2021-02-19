import React from 'react';
import { PbToolTip } from '../common/ToolTips';
import { PROFILE_URL } from '../../InternalLinks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SizeType } from '../../types/unionTypes';
import { Avatar } from '../../chakra/Forms';

interface IUserAvatarProps {
  userName?: string;
  size?: SizeType;
}

const UserAvatar: React.FC<IUserAvatarProps> = ({ userName, size, ...rest }) => {
  const router = useRouter();
  return (
    <Link href={`${PROFILE_URL}/${userName}`}>
      <PbToolTip label={userName}>
        <Avatar size={size ?? 'md'} borderWidth={1} name={userName} {...rest} onClick={() => router.push(`${PROFILE_URL}/${userName}`)} 
        css={{
                border: '2px solid white',
              }} />
      </PbToolTip>
    </Link>
  );
};

export default UserAvatar;
