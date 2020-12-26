import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { GetLiftingStatByIdUrl } from '../../api/account/liftingStats';
import { useAxios } from '../../hooks/useAxios';
import { IPersonalBestDetailed } from '../../interfaces/liftingStats';
import { PageHeader, TextSm } from '../common/Texts';
import ProgressSpinner from '../common/ProgressSpinner';
import { CenterColumnFlex } from '../layout/Flexes';
import { ModalBack } from '../common/Modals';
import { WORKOUT_DIARY_URL } from '../util/InternalLinks';
import { BreadcrumbBase, IBreadcrumbInput } from '../common/Breadcrumbs';
import { useRouter } from 'next/router';

interface IProps {}

const LiftingStatDetailed: React.FC<IProps> = ({}) => {
  const router = useRouter();
  const { exerciseId } = router.query;

  const { loading, data: liftingStat, error } = useAxios<IPersonalBestDetailed>(GetLiftingStatByIdUrl(parseInt(exerciseId as string)));

  const { isOpen: isBackOpen, onOpen: onBackOpen, onClose: onBackClose } = useDisclosure();

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: WORKOUT_DIARY_URL, name: 'Diary' },
    { href: '#', name: liftingStat?.exerciseName! },
  ];

  useEffect(() => {
    if (error) onBackOpen();
  }, [error]);

  if (loading || liftingStat === undefined) return <ProgressSpinner />;
  if (error) return <PageHeader>No Personal Best Found</PageHeader>;

  return (
    <Box>
      <BreadcrumbBase values={breadcrumbInput} />
      <CenterColumnFlex w="100%">
        <PageHeader>{liftingStat!.exerciseName!}</PageHeader>
        <TextSm pb={5}>{liftingStat!.lifeTimeTonnage}kg Lifetime Tonnage </TextSm>
        {/* <LiftFeed liftFeed={liftingStat!.liftFeed} /> */}
        <SimpleGrid spacing="25px" columns={2}>
          <TextSm p={1}>Reps</TextSm>
          <TextSm p={1}>Personal Best</TextSm>
        </SimpleGrid>
        {liftingStat.liftingStats &&
          liftingStat.liftingStats.map((x, idx) => (
            <Box key={idx}>
              <SimpleGrid spacing="25px" columns={2}>
                <TextSm textAlign="center" minW={100} pr={16}>
                  {x.repRange}
                </TextSm>{' '}
                <TextSm textAlign="center" minW={100}>
                  {x.weight}
                </TextSm>
              </SimpleGrid>
            </Box>
          ))}
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
      </CenterColumnFlex>
    </Box>
  );
};

export default LiftingStatDetailed;
