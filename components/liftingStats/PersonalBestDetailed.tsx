import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { PageTitle, TextSm } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { WORKOUT_DIARY_URL } from '../../InternalLinks';
import { BreadcrumbBase, IBreadcrumbInput } from '../common/Breadcrumbs';
import { IPersonalBestDetailed } from 'powerbuddy-shared';
import { useUserContext } from '../users/UserContext';

const PersonalBestDetailed: React.FC<IPersonalBestDetailed> = ({ exerciseName, lifeTimeTonnage, liftingStats }) => {
  const { weightType } = useUserContext();

  var breadcrumbInput: IBreadcrumbInput[] = [
    { href: WORKOUT_DIARY_URL, name: 'Diary' },
    { href: '#', name: exerciseName! },
  ];

  return (
    <Box>
      <BreadcrumbBase values={breadcrumbInput} />
      <CenterColumnFlex w="100%" mt={8}>
        <PageTitle>{exerciseName!}</PageTitle>
        <TextSm pb={5}>
          {lifeTimeTonnage}
          {weightType} Lifetime Tonnage{' '}
        </TextSm>
        <Box>
          <SimpleGrid spacing="25px" columns={2}>
            <TextSm p={1}>Reps</TextSm>
            <TextSm p={1}>Personal Best</TextSm>
          </SimpleGrid>
          {liftingStats &&
            liftingStats.map((x, idx) => (
              <Box key={idx}>
                <SimpleGrid spacing="25px" columns={2}>
                  <TextSm textAlign="center" minW={100} pr={16}>
                    {x.repRange}
                  </TextSm>{' '}
                  <TextSm textAlign="center" minW={100}>
                    {x.weight}
                    {weightType}
                  </TextSm>
                </SimpleGrid>
              </Box>
            ))}
        </Box>
      </CenterColumnFlex>
    </Box>
  );
};

export default PersonalBestDetailed;
