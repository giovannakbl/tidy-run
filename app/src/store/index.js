import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { combineReducers } from "redux";
import { authReducer } from './Auth/reducer';
import { challengeReducer } from './Challenge/reducer';
import { tidyUserReducer } from './TidyUser/reducer';

export const baseURL = "http://localhost:8000";

// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('state');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     return undefined;
//   }
// }; 

// export const saveState = (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState);
//   } catch {
//   }
// };
// const persistedState = loadState();
export const store = configureStore({
  reducer: combineReducers({
    tidyUser: tidyUserReducer,
    auth: authReducer,
    challenge: challengeReducer
  }),
  // preloadedState: persistedState
});
// store.subscribe(() => {
//   saveState({
//     auth: store.getState().auth
//   });
// });


