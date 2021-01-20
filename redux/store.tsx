import { createStore, applyMiddleware, Store, compose, AnyAction } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { reduxReducer } from './reduxReducer';
import { IReduxState } from './initialState';

export interface IAppState {
  state: IReduxState;
  // accState: IAccountState;
}

//const store = createStore(combineReducers, applyMiddleware(thunk));
const appReducer = combineReducers<IAppState>({
  state: reduxReducer,
  // accState: accountReducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};

//@ts-ignore
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
////const store = createStore(
///// rootReducer,
///* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
//);

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  //const store = createStore(rootReducer);
  return store;
}
