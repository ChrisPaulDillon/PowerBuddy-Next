import { Box } from '@chakra-ui/react';
import React from 'react';
import AddExerciseDialog from './AddExerciseDialog';
import AddWorkoutNoteDialog from './AddWorkoutNoteDialog';
import AddWorkoutTemplateDialog from './AddWorkoutTemplateDialog';
import DeleteWorkoutLogDialog from './DeleteWorkoutLogDialog';
import NotifyPersonalBestDialog from './NotifyPersonalBestDialog';

const SharedDialogs = () => (
  <Box>
    <AddExerciseDialog />
    <AddWorkoutNoteDialog />
    <DeleteWorkoutLogDialog />
    <AddWorkoutTemplateDialog />
    <NotifyPersonalBestDialog />
  </Box>
);

export default SharedDialogs;
