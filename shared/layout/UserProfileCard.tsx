//@ts-nocheck
import { Heading, Box, Center, Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { IPublicUser } from 'powerbuddy-shared/lib';
import { useRouter } from 'next/router';
import React from 'react';
import { PROFILE_URL } from '../../InternalLinks';
import { PrimaryButton } from '../../components/common/Buttons';
import UserAvatar from '../../components/layout/UserAvatar';

interface IUserProfileCardProps {
  user: IPublicUser;
}

const UserProfileCard: React.FC<IUserProfileCardProps> = ({ user }) => {
  const router = useRouter();

  return (
    <Center py={6}>
      <Box maxW={'270px'} minW={'270px'} w={'full'} bg={useColorModeValue('white', 'gray.800')} boxShadow={'2xl'} rounded={'md'} overflow={'hidden'}>
        {/* <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
          /> */}
        <Flex justify="center" mt={6}>
          <UserAvatar userName={user?.userName} />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user?.userName}
            </Heading>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{user?.workoutDayCount}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Days Logged
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>{user?.personalBestCount}</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Personal Bests
              </Text>
            </Stack>
          </Stack>

          <PrimaryButton w={'full'} mt={8} onClick={() => router.push(`${PROFILE_URL}/${user?.userName}`)}>
            View Profile
          </PrimaryButton>
        </Box>
      </Box>
    </Center>
  );
};

export default UserProfileCard;
