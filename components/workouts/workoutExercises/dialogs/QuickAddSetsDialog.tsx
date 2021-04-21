import React from "react";
import { ModalForm } from "../../../common/Modals";
import { useWorkoutStateDisclosure } from "../../store/workoutState";
import QuickAddSetsForm from '../../forms/QuickAddSetsForm';
import { IWorkoutExercise } from 'powerbuddy-shared';

interface IProps {
    workoutExercise?: IWorkoutExercise;
    note?: string;
}

const QuickAddSetsDialog: React.FC<IProps> = ({ workoutExercise}) => {
    const { isOpen, onClose } = useWorkoutStateDisclosure('quickAddSets');

    return(<ModalForm isOpen={isOpen} onClose={onClose} title="Delete Exercise?"><QuickAddSetsForm             
    workoutExercise={workoutExercise}
    suggestedReps={workoutExercise?.workoutSets[0].noOfReps}
    suggestedWeight={workoutExercise?.workoutSets[0].weightLifted}
    totalSets={workoutExercise.noOfSets}
    onClose={onClose}/></ModalForm>)
}

export default QuickAddSetsDialog;