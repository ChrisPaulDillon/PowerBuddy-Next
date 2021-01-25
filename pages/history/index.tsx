import { NextPage } from 'next';
import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';
import React from 'react';
import { HeadingMd, PageTitle } from '../../components/common/Texts';
import { CenterColumnFlex } from '../../components/layout/Flexes';
import { GetAllWorkoutLogStatsUrl } from '../../api/account/workoutLog';
import { useAxios } from '../../hooks/useAxios';
import { IWorkoutLogStats } from 'powerbuddy-shared';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { TagExerciseCount, TagProgramDaysCount, TagProgramLogsCount } from '../../components/shared/Tags';
import LogHistoryList from '../../components/logHistory/LogHistoryList';
import { Error } from '../../components/common/Error';
import { PageContent, PageHeader } from '../../components/layout/Page';
import { withAuthorized } from '../../util/authMiddleware';

const Index: NextPage = () => {
  const { loading, data: workoutLogStats, statusCode } = useAxios<IWorkoutLogStats>(GetAllWorkoutLogStatsUrl());
  //   const { data: workoutSummaries } = useAxios<IWorkoutDaySummary[]>(GetWorkoutSummariesUrl());

  if (loading) return <ProgressSpinner />;

  if (statusCode === 404 || workoutLogStats == null)
    return <Error statusCode={404} description="No Diary History Found. Start a diary entry and it will appear here" />;

  return (
    <Box>
      <PageHeader title="Workout History" />
      <PageContent>
        <CenterColumnFlex>
          <PageTitle>Workout History</PageTitle>
          <Box pb={3} mt={2}>
            <HeadingMd>Lifetime Stats</HeadingMd>
          </Box>
          <Flex mb={4}>
            <Box px={1}>
              <TagProgramLogsCount body={`${workoutLogStats!.lifetimeLogCount} Programs`} size="lg" />
            </Box>
            <Box px={1}>
              <TagProgramDaysCount body={`${workoutLogStats!.lifetimeDayCount} Days`} size="lg" />
            </Box>
            <Box px={1}>
              <TagExerciseCount body={`${workoutLogStats!.lifetimeExerciseCount} Exercises`} size="lg" />
            </Box>
          </Flex>
          <Tabs variant="enclosed-colored" colorScheme="purple" align="center" size="md" mt={4}>
            <TabList>
              <Tab>Programs</Tab>
              <Tab>Workouts</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {workoutLogStats && workoutLogStats.workoutLogStats && <LogHistoryList workoutLogStats={workoutLogStats!.workoutLogStats!} />}
              </TabPanel>
              <TabPanel>
                {/* {workoutSummaries && (
                <CenterColumnFlex flexDir={{ lg: 'row', md: 'row', sm: 'row', xs: 'column' }} wrap="wrap">
                  {workoutSummaries.map((x, idx) => (
                    <Box key={idx} p={4}>
                     <WorkoutDaySummarySingle {...x} /> 
                    </Box>
                  ))}
                </CenterColumnFlex>
              )} */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CenterColumnFlex>
      </PageContent>
    </Box>
  );
};

export default withAuthorized(Index);
