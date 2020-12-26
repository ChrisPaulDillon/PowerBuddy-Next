import { Box, Flex, ScaleFade } from '@chakra-ui/core';
import React, { useMemo } from 'react';
import { FaUserFriends, GiChart, IoMdTrophy } from 'react-icons/all';
import { BsCalendarFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { MdDeveloperMode } from 'react-icons/md';
import PbDelayedRender from '../common/DelayedRender';
import PbIconButton from '../common/IconButtons';
import { TextXs } from '../common/Texts';
import { Card } from '../layout/Card';
import { CenterColumnFlex } from '../layout/Flexes';
import { USERS_URL, PERSONALBESTS_URL, PORTAL_URL, TEMPLATES_URL, WORKOUT_DIARY_URL } from '../util/InternalLinks';

const LandingList = () => {
  const options = useMemo(
    () => ({
      groups: [
        {
          items: [
            {
              description:
                'Choose from a huge variety of Powerlifting & Weightlifting templates and have your next training block automatically created',
              icon: BsFillGrid3X3GapFill,
              url: TEMPLATES_URL,
              delay: 1000,
            },
          ],
        },
        {
          items: [
            {
              description: 'Personal Bests are automatically tracked and notifications are sent everytime a new best is hit',
              icon: IoMdTrophy,
              url: PERSONALBESTS_URL,
              delay: 2000,
            },
          ],
        },
        {
          items: [
            {
              description: 'Track your progress using the fully customisable diary. Share your training program with friends or family',
              icon: BsCalendarFill,
              url: WORKOUT_DIARY_URL,
              delay: 3000,
            },
          ],
        },
        {
          items: [
            {
              description: 'View your friends and gym partners progress. See your friends Personal Bests be hit in real time',
              icon: FaUserFriends,
              url: USERS_URL,
              delay: 4000,
            },
          ],
        },
        {
          items: [
            {
              description: 'Get real insights and data on your training blocks and progress',
              icon: GiChart,
              url: PORTAL_URL,
              delay: 5000,
            },
          ],
        },
        {
          items: [
            {
              description: 'Using this solution contributes towards indie development',
              icon: MdDeveloperMode,
              url: PORTAL_URL,
              delay: 6000,
            },
          ],
        },
      ],
    }),
    []
  );

  return (
    <Flex
      wrap="wrap"
      justify="center"
      w="100%"
      flexDir={{ xl: 'row', lg: 'row', md: 'column', sm: 'column', xs: 'column', base: 'column' }}
      alignItems="center"
      align="center">
      {options.groups.map((group, idx) => (
        <Box key={idx} p={2} w={{ base: '25%', xl: '25%', lg: '25%', md: '25%', sm: '100%', xs: '100%' }}>
          {group.items.map((item: any) => (
            <LandingSingle description={item.description} Icon={item.icon} delay={item.delay} url={item.url} />
          ))}
        </Box>
      ))}
    </Flex>
  );
};

interface IProps {
  description: string;
  Icon: any;
  url: string;
  delay: number;
}

const LandingSingle: React.FC<IProps> = ({ description, Icon, url, delay }) => {
  return (
    <PbDelayedRender delay={delay}>
      <ScaleFade initialScale={0.9} in={true}>
        <Card minH="125px" maxW="sm">
          <CenterColumnFlex>
            <PbIconButton Icon={Icon} fontSize="25px" label="" onClick={() => (window.location.href = url)} />
            <TextXs mt={4} textAlign="center">
              {description}
            </TextXs>
          </CenterColumnFlex>
        </Card>
      </ScaleFade>
    </PbDelayedRender>
  );
};

export default LandingList;
