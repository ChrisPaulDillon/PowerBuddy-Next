import React, { useCallback } from 'react';
import { Flex, Box, Button, Text } from '@chakra-ui/core';
import { Card } from '../layout/Card';
import { IExercise } from '../../interfaces/exercises';
import { HeadingMd, PageHeader, TextSm, TextXs } from '../common/Texts';
import { useRouter } from 'next/router';

interface Props {
  exercises: IExercise[];
}
const ExerciseCardList: React.FC<Props> = ({ exercises }) => (
  <Flex flexDirection="row" flexWrap="wrap" justifyContent="center" alignItems="center" p="1">
    {exercises.map((exercise) => (
      <ExerciseCardSingle key={exercise.exerciseId!} {...exercise!} />
    ))}
  </Flex>
);

const ExerciseCardSingle: React.FC<IExercise> = ({ exerciseId, exerciseName, exerciseTypeName }) => {
  const router = useRouter();
  const handleDetailClick = useCallback(() => router.push(`/exercises/${exerciseId}`), [history]);

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
        <Button colorScheme="pink" onClick={handleDetailClick}>
          Details
        </Button>
      </Box>
    </Card>
  );
};
export default ExerciseCardList;
