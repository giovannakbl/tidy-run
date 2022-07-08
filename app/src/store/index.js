import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./Auth/reducer";
import { challengeReducer } from "./Challenge/reducer";
import { homeMembersReducer } from "./HomeMembers/reducer";
import { modelTasksReducer } from "./ModelTasks/reducer";
import { tasksReducer } from "./Tasks/reducer";
import { tidyUserReducer } from "./TidyUser/reducer";
import { scoreBoardsReducer } from "./ScoreBoards/reducer";

export const baseURL = "http://localhost:8000";

export const standardOptions = {
  taskIcon: [
    {
      name: "Mop",
      icon: "coffee",
    },
    {
      name: "Brush",
      icon: "fa-apple-whole",
    },
    {
      name: "Cloth",
      icon: "fa-bell",
    },
    {
      name: "Spray",
      icon: "fa-bicycle",
    },
    {
      name: "Broom",
      icon: "fa-bolt",
    },
  ],
  iconColor: [
    {
      name: "Red",
      color: "red",
    },
    {
      name: "Green",
      color: "green",
    },
    {
      name: "Blue",
      color: "blue",
    },
    {
      name: "Yellow",
      color: "#9a7600",
    },
    {
      name: "Pink",
      color: "pink",
    },
  ],
  difficulty: [
    {
      name: "Easy",
    },
    {
      name: "Medium",
    },
    {
      name: "Hard",
    },
  ],
  avatarIcon: [
    {
      name: "Dog",
      icon: "coffee",
    },
    {
      name: "Cat",
      icon: "fa-apple-whole",
    },
    {
      name: "Rabbit",
      icon: "fa-bell",
    },
    {
      name: "Wale",
      icon: "fa-bicycle",
    },
    {
      name: "Lizzard",
      icon: "fa-bicycle",
    },
    {
      name: "Banana",
      icon: "fa-bicycle",
    },
  ],
};

export const getErrorMessageApi = (errorInfo) => {
  if (errorInfo.status_code !== undefined && errorInfo.status_code !== null) {
    switch (errorInfo.status_code) {
      case 601:
        return "User Not Found";
        break;
      case 602:
        return "Home Member Not Found";
        break;
      case 603:
        return "This Email is already registered";
        break;
      case 604:
        return "Model Task Not Found";
        break;
      case 605:
        return "Challenge Not Found";
        break;
      case 606:
        return "Task Not Found";
        break;
      default:
        return "Something went wrong";
        break;
    }
  } else if (errorInfo.code === 401) {
    return "Incorrect Email or password";
  }
  else {
    return "Something went wrong";
  }
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
