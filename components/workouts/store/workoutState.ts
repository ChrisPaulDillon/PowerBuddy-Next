import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IWorkoutExercise, IWorkoutSet, IWorkoutDay, ILiftingStat } from 'powerbuddy-shared';
import { useAppDispatch, useAppSelector } from '../../../store';
import { useCallback } from 'react';
import { IUpdateSetAction, IDeleteSetAction } from '../workoutExercises/forms/EditWorkoutSetForm';
import { UpdateExerciseNoteAction } from '../workoutExercises/forms/AddExerciseNoteForm';

type WorkoutModalsState = {
  addExercise?: boolean;
  addExerciseNote?: boolean;
  deleteExercise?: boolean;
  quickAddSets?: boolean;
  updateSet?: boolean;
  deleteLog?: boolean;
  addWorkoutNote?: boolean;
  addWorkoutTemplate?: boolean;
};

const initialModalsState: WorkoutModalsState = {};

export type WorkoutModal = keyof WorkoutModalsState;

type WorkoutState = {
  workoutDay: IWorkoutDay;
  workoutExercises: IWorkoutExercise[];
  kgOrLbs: string;
  modals: WorkoutModalsState;
  personalBests: ILiftingStat[];
};

const initialState: WorkoutState = {
  workoutDay: null,
  workoutExercises: [],
  kgOrLbs: 'kg',
  modals: initialModalsState,
  personalBests: [],
};

// Create the state slice
const workoutStateSlice = createSlice({
  name: 'workoutState',
  initialState,
  reducers: {
    updateDayNote: (state, action: PayloadAction<string>): WorkoutState => ({
      ...state,
      workoutDay: { ...state.workoutDay, comment: action.payload },
    }),
    DeleteDay: (state): WorkoutState => ({ ...state }),
    UpdateDay: (state, action: PayloadAction<IWorkoutDay>): WorkoutState => ({ ...state }),
    createExercise: (state, action: PayloadAction<IWorkoutExercise>): WorkoutState => ({
      ...state,
      workoutExercises: [...state.workoutExercises, action.payload],
    }),
    UpdateExerciseNotes: (state, action: PayloadAction<number, string>): WorkoutState => ({ ...state }),
    deleteExercise: (state, action: PayloadAction<number>): WorkoutState => ({
      ...state,
      workoutExercises: state.workoutExercises.filter((x) => x.workoutExerciseId !== action.payload),
    }),
    updateExerciseNote: (state, action: PayloadAction<UpdateExerciseNoteAction>): WorkoutState => ({
      ...state,
      workoutExercises: state.workoutExercises?.map((x) =>
        x.workoutExerciseId === action.payload.workoutExerciseId
          ? {
              ...x,
              comment: action.payload.notes,
            }
          : x
      ),
    }),
    editSet: (state, action: PayloadAction<IUpdateSetAction>): WorkoutState => ({
      ...state,
      workoutExercises: state.workoutExercises.map((e) => {
        if (e.workoutExerciseId === action.payload.workoutExerciseId) {
          return {
            ...e,
            workoutSets: e.workoutSets?.map((r) => (r.workoutSetId === action.payload.workoutSet.workoutSetId ? (r = action.payload.workoutSet) : r)),
          };
        } else {
          return e;
        }
      }),
    }),
    deleteSet: (state, action: PayloadAction<IDeleteSetAction>): WorkoutState => ({
      ...state,
      workoutExercises: state?.workoutExercises.map((d) => {
        if (d.workoutExerciseId === action.payload.workoutExerciseId) {
          return {
            ...d,
            noOfSets: d.noOfSets - 1,
            workoutSets: d.workoutSets?.filter((r) => r.workoutSetId !== action.payload.workoutSetId),
          };
        } else {
          return d;
        }
      }),
    }),
    setWorkout: (state, action: PayloadAction<IWorkoutDay>): WorkoutState => ({
      ...state,
      workoutDay: action.payload,
      workoutExercises: action.payload.workoutExercises,
    }),
    setKgOrLbs: (state, action: PayloadAction<boolean>): WorkoutState => ({ ...state, kgOrLbs: action.payload ? 'kg' : 'lbs' }),
    quickAddSets: (state, action: PayloadAction<IWorkoutSet[]>): WorkoutState => ({
      ...state,
      workoutExercises: state.workoutExercises?.map((d) => {
        if (d.workoutExerciseId === action.payload[0].workoutExerciseId) {
          return {
            ...d,
            noOfSets: d.noOfSets + action.payload.length,
            workoutSets: [...d.workoutSets, ...action.payload],
          };
        } else {
          return d;
        }
      }),
    }),
    setPersonalBests: (state, action: PayloadAction<ILiftingStat[]>): WorkoutState => ({
      ...state,
      personalBests: [...action.payload],
    }),
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
  setWorkout,
  quickAddSets,
  editSet,
  deleteSet,
  createExercise,
  setPersonalBests,
  updateDayNote,
  deleteExercise,
  updateExerciseNote,
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