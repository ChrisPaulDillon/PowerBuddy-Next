import React from "react";
import { ModalForm } from "../../../common/Modals";
import AddExerciseNoteForm from "../../forms/AddExerciseNoteForm";
import { useWorkoutStateDisclosure } from "../../store/workoutState";


interface IProps {
    workoutExerciseId: number;
    note?: string
}

const AddExerciseNoteDialog: React.FC<IProps> = ({workoutExerciseId, note}) => {
    const { isOpen, onClose } = useWorkoutStateDisclosure('addExerciseNote');

    return(<ModalForm isOpen={isOpen} onClose={onClose} title="Add an Exercise"><AddExerciseNoteForm workoutExerciseId={workoutExerciseId} note={note} onClose={onClose}/></ModalForm>)
}

export default AddExerciseNoteDialog;