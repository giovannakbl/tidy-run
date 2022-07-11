import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authReducer } from "./Auth/reducer";
import { challengeReducer } from "./Challenge/reducer";
import { homeMembersReducer } from "./HomeMembers/reducer";
import { modelTasksReducer } from "./ModelTasks/reducer";
import { tasksReducer } from "./Tasks/reducer";
import { tidyUserReducer } from "./TidyUser/reducer";
import { scoreBoardsReducer } from "./ScoreBoards/reducer";

// export const baseURL = "http://localhost:8000";
// export const baseURL = "http://192.168.88.110:8000";


export const standardOptions = {
  taskIcon: [
    {
      name: "Mug",
      icon: "coffee",
    },
    {
      name: "Pet",
      icon: "fa-paw",
    },
    {
      name: "Car",
      icon: "fa-car",
    },
    {
      name: "Spray",
      icon: "fa-spray-can-sparkles",
    },
    {
      name: "Fridge",
      icon: "fa-toilet-portable",
    },
    {
      name: "Garage",
      icon: "fa-warehouse",
    },
    {
      name: "Book",
      icon: "fa-book",
    },
    {
      name: "Cake",
      icon: "fa-cake-candles",
    },

    {
      name: "Bucket",
      icon: "fa-bucket",
    },
    {
      name: "ToiletPaper",
      icon: "fa-toilet-paper",
    },
    {
      name: "Bath",
      icon: "fa-bath",
    },
    {
      name: "Baby",
      icon: "fa-baby",
    },
    {
      name: "Shirt",
      icon: "fa-shirt",
    },
    {
      name: "Brush",
      icon: "fa-brush",
    },
    {
      name: "Broom",
      icon: "fa-broom",
    },
    {
      name: "Wrench",
      icon: "fa-wrench",
    },
    {
      name: "Trash",
      icon: "fa-trash-can",
    },
    {
      name: "Candy",
      icon: "fa-candy-cane",
    },
    {
      name: "Bed",
      icon: "fa-bed",
    },
    {
      name: "KitchenSet",
      icon: "fa-kitchen-set",
    },
  ],
  iconColor: [
    {
      name: "Red",
      color: "rgb(212, 86, 86)",
    },
    {
      name: "Green",
      color: "rgb(64, 162, 79)",
    },
    {
      name: "Blue",
      color: "rgb(86, 108, 193",
    },
    {
      name: "Yellow",
      color: "rgb(186, 186, 51)",
    },
    {
      name: "Pink",
      color: "rgb(180, 94, 151)",
    },
    {
      name: "NavyBlue",
      color: "rgb(17, 27, 87)",
    },
    {
      name: "DarkRed",
      color: "rgb(129, 39, 39)",
    },
    {
      name: "DarkPink",
      color: "rgb(106, 28, 87)",
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
      icon: "fa-dog",
    },
    {
      name: "Cat",
      icon: "fa-cat",
    },
    {
      name: "Dragon",
      icon: "fa-dragon",
    },
    {
      name: "Astronaut",
      icon: "fa-user-astronaut",
    },
    {
      name: "UserTie",
      icon: "fa-user-tie",
    },
    {
      name: "ChessQueen",
      icon: "fa-chess-queen",
    },
    {
      name: "CheesKnight",
      icon: "fa-chess-knight",
    },
    {
      name: "Ghost",
      icon: "fa-ghost",
    },
    {
      name: "Doctor",
      icon: "fa-user-doctor",
    },
    {
      name: "Biker",
      icon: "fa-person-biking",
    },
    {
      name: "SecretAgent",
      icon: "fa-user-secret",
    },
    {
      name: "Robot",
      icon: "fa-robot",
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
