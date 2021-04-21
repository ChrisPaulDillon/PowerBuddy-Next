import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import rootReducer from './rootReducer';
// import saga from './rootSaga';

const isProduction = process.env.NODE_ENV === 'production';

const preloadedState = {};

const sagaMiddleware = createSagaMiddleware();

let middleware = [thunk, sagaMiddleware];

if (!isProduction) {
  middleware = middleware.concat(logger);
}

const reducer = combineReducers({ ...rootReducer });

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middleware),
  devTools: isProduction ? false : true,
  preloadedState,
});

export const persistor = persistStore(store);

// // run the sagas
// sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // Export a hook that can be reused to resolve types
export default store;
