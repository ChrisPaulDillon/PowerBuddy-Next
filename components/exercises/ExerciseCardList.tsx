import React from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import { Card } from '../layout/Card';
import { HeadingMd, TextSm, TextXs } from '../common/Texts';
import { useRouter } from 'next/router';
import { IExercise } from 'powerbuddy-shared';
import { Box } from '../../chakra/Layout';

interface Props {
  exercises: IExercise[];
}

const ExerciseCardList: React.FC<Props> = ({ exercises }) => (
  <Flex flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="center" p="1">
    {exercises.map((exercise, key) => (
      <Box key={key}>
        <ExerciseCardSingle key={exercise?.exerciseId} {...exercise} />
      </Box>
    ))}
  </Flex>
);

const ExerciseCardSingle: React.FC<IExercise> = ({ exerciseId, exerciseName, exerciseTypeName }) => {
  const router = useRouter();
  return (
    <Card borderWidth="1px" rounded="lg" overflow="hidden" m="2" textAlign="center">
      <Box p="2">
        <HeadingMd mt="1" lineHeight="tight" isTruncated>
          {exerciseName}
        </HeadingMd>
      </Box>
      <TextSm color="gray.600" fontSize="sm">
        {exerciseTypeName && <Text>{exerciseTypeName} Exercise</Text>}
      </TextSm>
      <TextXs fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" m="2"></TextXs>
      <Box pt="2">
        <Button colorScheme="pink" onClick={() => router.push(`/exercises/${exerciseId}`)}>
          Details
        </Button>
      </Box>
    </Card>
  );
};
export default ExerciseCardList;
