import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IWorkoutDay } from 'powerbuddy-shared/lib';
import { IWorkoutExercise, IWorkoutSet } from 'powerbuddy-shared';

type WorkoutModalsState = {
    launcherError?: string;
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
    modals: WorkoutModalsState
}

const initialState : WorkoutState = {
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
        EditSet: (state, action: PayloadAction<IWorkoutSet, number>) : WorkoutState => ({...state}),
        DeleteSet: (state, action: PayloadAction<number, number>) : WorkoutState => ({...state}),
        QuickAddSetsToExercise: (state, action: PayloadAction<IWorkoutSet[], number>) : WorkoutState => ({...state}),
    
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
    addChatMessage,
    ppmRequest,
    ppmAccept,
    ppmReject,
    clearIncome,
    openUserActions,
    setRemoteCamUser,
    clearRemoteCamUser,
    remoteCamClosed,
    setIsChatOnly,
    setIsAudioMuted,
    showRemoteCam,
    hideRemoteCam,
    toggleRemoteCam,
    toggleIsCameraFlipped,
    setIsCameraFlipped,
    setActivePanel,
    modalOnOpen,
    modalOnClose,
    modalOnCloseAll,
  } = actions;
  
//   // Helper hooks
//   export const useBroadcasterStateDisclosure = (name: BroadcasterModal) => {
//     const dispatch = useAppDispatch();
//     const value = useAppSelector((state) => state.directCamBroadcaster.broadcasterState.modals[name]);
//     const onOpen = useCallback(() => dispatch(modalOnOpen(name)), [dispatch]);
//     const onClose = useCallback(() => dispatch(modalOnClose(name)), [dispatch]);
//     return {
//       isOpen: value ? true : false,
//       value,
//       onOpen,
//       onClose,
//     };
//   };
  
  export default reducer;
  