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
      name: "Mop",
      icon: "coffee"
    },
    {
      name: "Brush",
      icon: "fa-apple-whole"
    },
    {
      name: "Cloth",
      icon: "fa-bell"
    },
    {
      name: "Spray",
      icon: "fa-bicycle"
    },
    {
      name: "Broom",
      icon: "fa-bolt"
    }
  ],
  iconColor: [
    {
      name: "Red",
      color: 'red'
    },
    {
      name: "Green",
      color: 'green'
    },
    {
      name: "Blue",
      color: 'blue'
    },
    {
      name: "Yellow",
      color: 'yellow'
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
  ],
  avatarIcon: [
    {
      name: "Dog"
    },
    {
      name: "Cat"
    },
    {
      name: "Rabbit"
    },
    {
      name: "Wale"
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


