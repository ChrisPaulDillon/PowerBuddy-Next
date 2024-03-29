import { useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '../../chakra/Layout';
import { IAppState } from '../../redux/store';
import { PrimaryButton } from '../common/Buttons';
import { ModalDrawerForm } from '../common/ModalDrawers';
import { PbStack } from '../common/Stacks';
import { TextSm, TextXs } from '../common/Texts';
import EditExerciseForm from './forms/EditExerciseForm';

const ExerciseList = () => {
  const { exercises } = useSelector((state: IAppState) => state.state);
  const [exerciseId, setExerciseId] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEditClick = (exerciseId: number) => {
    setExerciseId(exerciseId);
    onOpen();
  };

  return (
    <Box>
      <PbStack>
        <TextSm>Exercise Name</TextSm>
        <TextSm>Exercise Type</TextSm>
        <TextSm>Is Main?</TextSm>
        <TextSm>Edit</TextSm>
      </PbStack>
      {exercises.map((x, idx) => (
        <PbStack key={idx}>
          {' '}
          <TextXs>{x.exerciseName}</TextXs>
          <TextXs>{x.exerciseTypeName}</TextXs>
          <TextXs>{x.isMainExercise ? 'Yes' : 'No'}</TextXs>
          <PrimaryButton onClick={() => handleEditClick(x.exerciseId)}>Edit</PrimaryButton>
        </PbStack>
      ))}
      <ModalDrawerForm title="Edit Exercise" isOpen={isOpen} onClose={onClose}>
        <EditExerciseForm exerciseId={exerciseId} />
      </ModalDrawerForm>
    </Box>
  );
};

export default ExerciseList;
