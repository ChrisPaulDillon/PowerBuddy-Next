import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWorkoutExercise, IWorkoutSet, IWorkoutDay } from 'powerbuddy-shared';
import { useAppDispatch, useAppSelector } from "../../../store";
import { useCallback } from "react";

type WorkoutModalsState = {
    addExercise?: boolean;
    kickedListModal?: boolean;
    confirmKickModal?: boolean;
    confirmPermKickModal?: boolean;
    userActionsModal?: boolean;
    contextualHelp?: boolean;
    noRegisteredDevices?: boolean;
    devicePermissionsError?: boolean;
    deviceFailedError?: boolean;
    logout?: boolean;
    settings?: boolean;
    // modals from the broadcaster main page
    loginError?: boolean;
    login?: boolean;
    loginRedirectWC?: boolean;
    loginPopUp?: boolean;
    loginChangeNickname?: boolean;
    updateApp?: boolean;
    isVATVerified?: boolean;
  };
  
  const initialModalsState: WorkoutModalsState = {};
  
  export type WorkoutModal = keyof WorkoutModalsState;
  
type WorkoutState = {
    workoutDay: IWorkoutDay,
    modals: WorkoutModalsState
}

const initialState : WorkoutState = {
    workoutDay: null,
    modals: initialModalsState
}



// Create the state slice
const workoutStateSlice = createSlice({
    name: 'workoutState',
    initialState,
    reducers: {
        UpdateDayNotes: (state, action: PayloadAction<string>): WorkoutState => ({...state}),
        DeleteDay: (state): WorkoutState => ({...state}),
        UpdateDay: (state, action: PayloadAction<IWorkoutDay>): WorkoutState =>({...state}),
        CreateExercise: (state, action: PayloadAction<IWorkoutExercise>): WorkoutState  => ({...state}),
        UpdateExerciseNotes: (state, action: PayloadAction<number, string>): WorkoutState  => ({...state}),
        DeleteExercise: (state, action: PayloadAction<number>): WorkoutState  => ({...state}),
        // EditSet: (state, action: PayloadAction<IWorkoutSet, number>) : WorkoutState => ({...state}),
        // DeleteSet: (state, action: PayloadAction<number, number>) : WorkoutState => ({...state}),
        // QuickAddSetsToExercise: (state, action: PayloadAction<IWorkoutSet[], number>) : WorkoutState => ({...state}),
    
        setWorkout: (state, action: PayloadAction<IWorkoutDay> ): WorkoutState => ({...state, workoutDay: action.payload}),
      // Modals and Dialogs
      modalOnOpen: (state, action: PayloadAction<WorkoutModal>): WorkoutState => {
        return { ...state, modals: { ...state.modals, [action.payload]: true } };
      },
      modalOnClose: (state, action: PayloadAction<WorkoutModal>): WorkoutState => ({ ...state, modals: { ...state.modals, [action.payload]: false } }),
      modalOnCloseAll: (state): WorkoutState => ({ ...state, modals: { ...initialModalsState } }),
    },
    extraReducers: (builder) => {
      // Handle any extra actions which are not created by this slice

    },
  });
  
  // Selectors
//   export const broadcasterChatMessagesSelector = (state: RootState): ChatMessage[] => state.directCamBroadcaster.broadcasterState.messages;
//   export const isOnlineSelector = (state: RootState): boolean => state.directCamBroadcaster.broadcasterState.statusIndicator === STATUS_INDICATOR.ONLINE;
  
  // Reducer and Action Exports
  const { reducer, actions } = workoutStateSlice;

  export const {
    modalOnOpen,
    modalOnClose,
    modalOnCloseAll,
    setWorkout
  } = actions;

   // Helper hooks
  export const useWorkoutStateDisclosure = (name: WorkoutModal) => {
    const dispatch = useAppDispatch();
    const value = useAppSelector((state) => state.workout.workoutState.modals[name]);
    const onOpen = useCallback(() => dispatch(modalOnOpen(name)), [dispatch]);
    const onClose = useCallback(() => dispatch(modalOnClose(name)), [dispatch]);
    return {
      isOpen: value ? true : false,
      value,
      onOpen,
      onClose,
    };
  };
  
  export default reducer;
  