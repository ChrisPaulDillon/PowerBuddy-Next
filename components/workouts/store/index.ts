import { combineReducers } from '@reduxjs/toolkit';
import workoutState from './workoutState'

const reducers = combineReducers({
    workoutState,
});

export default reducers;
