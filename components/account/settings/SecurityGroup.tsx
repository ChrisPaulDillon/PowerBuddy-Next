import { Box, Divider } from '@chakra-ui/react';
import { IUser } from 'powerbuddy-shared/lib';
import { CenterColumnFlex } from '../../layout/Flexes';
import PhoneNumberVerifyForm from './forms/PhoneNumberVerifyForm';
import UpdatePasswordForm from './forms/UpdatePasswordForm';

interface IProps {
  user: IUser;
}

const SecurityGroup: React.FC<IProps> = ({ user }) => {
  return (
    <Box>
      <CenterColumnFlex>
        <UpdatePasswordForm user={user} />
        <Box p={2}>
          <Divider />
        </Box>
        <PhoneNumberVerifyForm user={user} />
      </CenterColumnFlex>
    </Box>
  );
};

export default SecurityGroup;
