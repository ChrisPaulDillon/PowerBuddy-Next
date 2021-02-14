import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { IUser } from 'powerbuddy-shared/lib';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle, ImBlocked } from 'react-icons/all';
import { AcceptSmsConfirmationUrl } from '../../../../api/account/auth';
import { SendSmsVerificationUrl } from '../../../../api/public/sms';
import { FormControl, FormErrorMessage, FormLabel } from '../../../../chakra/Forms';
import { Box } from '../../../../chakra/Layout';
import { validateInput } from '../../../../util/formInputs';
import { FormButton } from '../../../common/Buttons';
import { TTIcon } from '../../../common/IconButtons';
import { FormInput } from '../../../common/Inputs';
import { FormStack } from '../../../common/Stacks';
import { TextSm } from '../../../common/Texts';
import { FormLayoutFlex } from '../../../layout/Flexes';
import { ToastError, ToastSuccess } from '../../../shared/Toasts';

interface IProps {
  user: IUser;
}

const PhoneNumberVerifyForm: React.FC<IProps> = ({ user }) => {
  const toast = useToast();

  const [error, setError] = useState<boolean>(false);
  const [smsSent, setSmsSent] = useState<boolean>(false);

  const { handleSubmit, formState, register, errors } = useForm();

  const onSubmit = async ({ phoneNumber, code }: any) => {
    if (smsSent) {
      try {
        const response = await axios.post(AcceptSmsConfirmationUrl(), { phoneNumber: phoneNumber as string, code: code as string });
        if (response && response.data) {
          toast(ToastSuccess('Success', 'Phone Number Successfully Verified'));
          setSmsSent(false);
        }
      } catch (err) {
        toast(ToastError('Error', 'Verification Failed, make sure you have typed the code correctly!'));
      }
    } else {
      // if (password1 !== password2) {
      //   setError(true);
      //   return;
      // }
      setError(false);

      try {
        const response = await axios.post(SendSmsVerificationUrl(), { phoneNumber: phoneNumber as string });
        if (response && response.data) {
          toast(ToastSuccess('Success', 'Successfully Sent Sms, Check Your Phone'));
          setSmsSent(true);
        }
      } catch (err) {
        toast(ToastError('Error', 'Invalid Phone Number Supplied'));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.phoneNumber}>
        <FormLayoutFlex>
          <FormLabel>Phone Number</FormLabel>
          <FormStack>
            {!user?.phoneNumberConfirmed && (
              <FormInput name="phoneNumber" ref={register({ validate: validateInput })} size="sm" defaultValue={user?.phoneNumber} />
            )}
            {user?.phoneNumberConfirmed && <TextSm>{user?.phoneNumber}</TextSm>}
            <Box ml={1}>
              {user?.phoneNumberConfirmed ? (
                <TTIcon as={AiFillCheckCircle} color="green.500" fontSize="20px" label="Verified Phone Number" />
              ) : (
                <TTIcon as={ImBlocked} color="red.500" fontSize="20px" label="Number Not Verified" />
              )}
            </Box>
          </FormStack>
          <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
        </FormLayoutFlex>
      </FormControl>
      {smsSent && (
        <FormControl isInvalid={errors.code}>
          <FormLayoutFlex>
            <FormLabel>Enter Code</FormLabel>
            <FormInput name="code" ref={register} size="sm" />
            <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
          </FormLayoutFlex>
        </FormControl>
      )}
      {error && <TextSm color="red.500">Passwords do not match</TextSm>}
      {!user?.phoneNumberConfirmed && <FormButton isLoading={formState.isSubmitting}>Verify</FormButton>}
    </form>
  );
};

export default PhoneNumberVerifyForm;
