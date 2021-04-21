import React from "react";
import { Box } from "../../../chakra/Layout"
import {Text} from '@chakra-ui/react';
import { useAppSelector } from '../../../store/index';
import WorkoutExercise from "./WorkoutExercise";

const WorkoutExerciseList = () => {
    const workoutExercises = useAppSelector((state) => state.workout?.workoutState?.workoutExercises);
    const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay);

    return(<Box>      
        {workoutExercises && workoutExercises?.length <= 0 ? (
        <Text textAlign="center" mt={6}>
          No exercises found, click the weight icon to get started!
        </Text>
      ) : (
        workoutExercises?.map((we, idx) => (
          <Box key={idx}>
            <WorkoutExercise workoutExercise={we} date={workoutDay?.date} />
          </Box>
        ))
      )}</Box>)
}

export default WorkoutExerciseList;