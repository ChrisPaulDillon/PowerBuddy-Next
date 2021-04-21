import { Box } from "../../../../chakra/Layout"
import AddExerciseNoteDialog from './AddExerciseNoteDialog';
import { IWorkoutExercise } from 'powerbuddy-shared';
import DeleteExerciseDialog from "./DeleteExerciseDialog";
import QuickAddSetsDialog from './QuickAddSetsDialog';

interface IProps {
    workoutExercise?: IWorkoutExercise;
}

const SharedExerciseDialogs: React.FC<IProps> = ({workoutExercise}) => {
    return(<Box>
        <AddExerciseNoteDialog workoutExerciseId={workoutExercise?.workoutExerciseId} note={workoutExercise?.comment} />
    <DeleteExerciseDialog workoutExerciseId={workoutExercise?.workoutExerciseId} />
    <QuickAddSetsDialog workoutExercise={workoutExercise} />
    </Box>)
}

export default SharedExerciseDialogs;