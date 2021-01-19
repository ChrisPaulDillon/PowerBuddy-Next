import { Box, Divider } from '@chakra-ui/core';
import { CenterColumnFlex } from '../../layout/Flexes';
import PhoneNumberVerifyForm from './forms/PhoneNumberVerifyForm';
import UpdatePasswordForm from './forms/UpdatePasswordForm';

interface IProps {
  currentPhoneNumber: string;
  phoneNumberConfirmed: boolean;
}

const SecurityGroup: React.FC<IProps> = ({ currentPhoneNumber, phoneNumberConfirmed }) => {
  return (
    <Box>
      <CenterColumnFlex>
        <UpdatePasswordForm />
        <Box p={2}>
          <Divider />
        </Box>
        <PhoneNumberVerifyForm currentPhoneNumber={currentPhoneNumber} phoneNumberConfirmed={phoneNumberConfirmed} />
      </CenterColumnFlex>
    </Box>
  );
};

export default SecurityGroup;
