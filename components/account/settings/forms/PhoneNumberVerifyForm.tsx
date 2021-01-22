import { Box, Flex, FormControl, FormErrorMessage, Icon, Tooltip, useToast } from '@chakra-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCheckCircle, ImBlocked } from 'react-icons/all';
import { RequestSmsVerificationUrl, SendSmsVerificationUrl } from '../../../../api/account/auth';
import { validateInput } from '../../../../util/formInputs';
import { PbPrimaryButton } from '../../../common/Buttons';
import { FormInput } from '../../../common/Inputs';
import { PbStack } from '../../../common/Stacks';
import { TextXs, TextSm } from '../../../common/Texts';
import { CenterColumnFlex } from '../../../layout/Flexes';

interface IProps {
  currentPhoneNumber: string;
  phoneNumberConfirmed: boolean;
}

const PhoneNumberVerifyForm: React.FC<IProps> = ({ currentPhoneNumber, phoneNumberConfirmed }) => {
  const toast = useToast();

  const [error, setError] = useState<boolean>(false);
  const [smsSent, setSmsSent] = useState<boolean>(false);

  const { handleSubmit, formState, register, errors } = useForm();

  const onSubmit = async ({ phoneNumber, code }: any) => {
    if (smsSent) {
      try {
        const response = await axios.post(SendSmsVerificationUrl(), { phoneNumber: phoneNumber as string, code: code as string });
        if (response && response.data) {
          toast({
            title: 'Success',
            description: 'Phone Number Successfully Verified',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          setSmsSent(false);
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Verification Failed, make sure you have typed the code correctly!',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      // if (password1 !== password2) {
      //   setError(true);
      //   return;
      // }
      setError(false);

      try {
        const response = await axios.post(RequestSmsVerificationUrl(), { phoneNumber: phoneNumber as string });
        if (response && response.data) {
          toast({
            title: 'Success',
            description: 'Successfully Sent Sms, Check Your Phone',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          setSmsSent(true);
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Invalid Phone Number Supplied',
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CenterColumnFlex mt="4">
        <Box m="1">
          <FormControl isInvalid={errors.phoneNumber}>
            <Flex>
              <PbStack>
                <TextXs pt="3" pr="1" minW="110px">
                  Phone Number
                </TextXs>
                <FormInput name="phoneNumber" ref={register({ validate: validateInput })} size="sm" defaultValue={currentPhoneNumber} />
              </PbStack>
              <Box ml={1}>
                {phoneNumberConfirmed ? (
                  <Icon as={AiFillCheckCircle} color="green.500" fontSize="20px" mt={2} />
                ) : (
                  <Icon as={ImBlocked} color="red.500" fontSize="20px" mt={2} />
                )}
              </Box>
            </Flex>
            <FormErrorMessage>{errors.phoneNumber && errors.phoneNumber.message}</FormErrorMessage>
          </FormControl>
        </Box>
        {smsSent && (
          <Box m="1">
            <FormControl isInvalid={errors.code}>
              <Flex>
                <PbStack>
                  <TextXs pt="3" pr="1" minW="110px">
                    Enter Code
                  </TextXs>
                  <FormInput name="code" ref={register} size="sm" />
                </PbStack>
              </Flex>
              <FormErrorMessage>{errors.code && errors.code.message}</FormErrorMessage>
            </FormControl>
          </Box>
        )}
        {error && <TextSm color="red.500">Passwords do not match</TextSm>}
        <CenterColumnFlex mt="4">
          <PbPrimaryButton type="submit" loading={formState.isSubmitting}>
            Verify
          </PbPrimaryButton>
        </CenterColumnFlex>
      </CenterColumnFlex>
    </form>
  );
};

export default PhoneNumberVerifyForm;
