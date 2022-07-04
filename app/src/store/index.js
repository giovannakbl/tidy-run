import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { authReducer } from './Auth/reducer';
import { challengeReducer } from './Challenge/reducer';
import { homeMembersReducer } from './HomeMembers/reducer';
import { modelTasksReducer } from './ModelTasks/reducer';
import { tasksReducer } from './Tasks/reducer';
import { tidyUserReducer } from './TidyUser/reducer';
import { scoreBoardsReducer } from './ScoreBoards/reducer';

export const baseURL = "http://localhost:8000";

export const standardOptions = {
  taskIcon: [
    {
      name: "Mop"
    },
    {
      name: "Brush hehe"
    }
  ],
  iconColor: [
    {
      name: "Red"
    }
  ],
  difficulty: [
    {
      name: "Easy"
    },
    {
      name: "Medium"
    },
    {
      name: "Hard"
    }
  ]
};

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
    challenge: challengeReducer,
    modelTasks: modelTasksReducer,
    homeMembers: homeMembersReducer,
    tasks: tasksReducer,
    scoreBoards: scoreBoardsReducer,
  }),
  // preloadedState: persistedState
});
// store.subscribe(() => {
//   saveState({
//     auth: store.getState().auth
//   });
// });


