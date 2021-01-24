import { NextPage } from 'next';
import { Box, useDisclosure } from '@chakra-ui/core';
import { IPersonalBestDetailed } from 'powerbuddy-shared/lib';
import { GetLiftingStatByIdUrl } from '../../api/account/liftingStats';
import { useAxios } from '../../hooks/useAxios';
import { useRouter } from 'next/router';
import React from 'react';
import { PageTitle } from '../../components/common/Texts';
import ProgressSpinner from '../../components/common/ProgressSpinner';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { ModalBack } from '../../components/common/Modals';
import PersonalBestDetailed from '../../components/liftingStats/PersonalBestDetailed';

const ExerciseSpecificPersonalBest: NextPage = () => {
  const router = useRouter();
  const { exerciseId } = router.query;

  const { loading, data: liftingStatDetailed, error } = useAxios<IPersonalBestDetailed>(GetLiftingStatByIdUrl(parseInt(exerciseId as string)));

  const { isOpen: isBackOpen, onClose: onBackClose } = useDisclosure();

  if (loading) return <ProgressSpinner />;

  if (error) return <PageTitle>No Personal Best Found</PageTitle>;

  return (
    <Box>
      <PersonalBestDetailed {...liftingStatDetailed} />

      {isBackOpen && (
        <ModalBack
          actionText="Return to Diary"
          isOpen={isBackOpen}
          onClose={onBackClose}
          title="No Data Found"
          body="You currently have no data logged for this exercise, fill in your diary and stats will appear here"
          onClick={() => router.push(WORKOUT_DIARY_URL)}
        />
      )}
    </Box>
  );
};

export default ExerciseSpecificPersonalBest;
