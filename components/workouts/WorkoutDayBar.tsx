import { Flex, Box } from "@chakra-ui/react"
import axios from "axios"
import moment from "moment"
import React, { useState } from "react"
import { AiOutlineMore } from "react-icons/ai"
import { BiDumbbell } from "react-icons/bi"
import { FcCheckmark } from "react-icons/fc"
import { UpdateWorkoutUrl } from "../../api/account/workoutDay"
import useFireToast from "../../hooks/useFireToast"
import { useAppDispatch, useAppSelector } from "../../store"
import TTIconButton from "../common/IconButtons"
import MenuBase from "../common/Menus"
import { modalOnOpen } from "./store/workoutState"


const WorkoutDayBar = () => {
    const workoutDay = useAppSelector((state) => state.workout?.workoutState?.workoutDay)
    const [dayEnabled] = useState<boolean>(moment(workoutDay?.date).isAfter(new Date()) ? true : false);
    const dispatch = useAppDispatch();
    const [noteLoading] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useFireToast();
    
    const updateWorkoutDay = async () => {
        setLoading(true);
        workoutDay.completed = true;
        try {
          const response = await axios.put(UpdateWorkoutUrl(workoutDay?.workoutDayId), workoutDay);
          if (response.data != null) {
            //setPersonalBests(response.data);
          }
          toast.Success('Diary Entry is now marked as complete');
        } catch (err) {
          toast.Error('Could not mark Diary Entry as complete');
          workoutDay.completed = false;
        }
        setLoading(false);
      };

//   const menuItems = useMemo(
//     (): IMenuItem[] => [
//       {
//         title: 'Delete Diary Log',
//         Icon: MdWarning,
//         onClick: onDeleteLogOpen,
//         loading: deleteLogLoading,
//       },
//       {
//         title: 'Add Workout Note',
//         Icon: FaRegCommentAlt,
//         onClick: onAddWorkoutNoteOpen,
//         loading: noteLoading,
//       },
//       {
//         title: 'Create Workout Template',
//         Icon: GiRun,
//         onClick: onAddWorkoutTemplateOpen,
//         loading: noteLoading,
//       },
//     ],
//     []
//   );

    return(   <Flex>
        {' '}
        <Box mx={1}>
          <TTIconButton
            label="Complete Workout"
            Icon={FcCheckmark}
            color={workoutDay?.completed ? 'green.500' : 'gray.500'}
            fontSize="30px"
            onClick={() => updateWorkoutDay()}
            isLoading={loading}
            isDisabled={dayEnabled}
          />
        </Box>
        <Box mx={1}>
          <TTIconButton
            label="Add New Exercise"
            Icon={BiDumbbell}
            color="gray.500"
            fontSize="30px"
            onClick={() => dispatch(modalOnOpen('addExercise'))}
          />
        </Box>
        <Box mx={1}>
          <MenuBase
            button={
              <TTIconButton label="Additional Options" Icon={AiOutlineMore} onClick={() => undefined} fontSize="25px" />
            }
          />
        </Box>
      </Flex>)
}

export default WorkoutDayBar;