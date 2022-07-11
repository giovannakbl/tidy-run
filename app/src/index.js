import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { CookiesProvider } from "react-cookie";
// import reportWebVitals from './reportWebVitals';
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCheckSquare,
  faCoffee,
  faAngry as fasfaAngry,
  faAppleWhole,
  faBell,
  faBicycle,
  faBolt,
  faPencil,
  faListCheck,
  faCheck,
  faClipboardCheck,
  faSquareCheck,
  faLockOpen,
  faXmark,
  faTrashCan,
  faQuestion,
  faInfo,
  faPeopleRoof,
  faBroom,
  faSoap,
  faSprayCanSparkles,

  faHouse,
  faCircleInfo,
  faCat,
  faDog,
  faDragon,
  faPaw,
  faUserAstronaut,
  faCar,
  faToiletPortable,
  faWarehouse,
  faBook,
  faCake,
  faCakeCandles,
  faSocks,
  faBucket,
  faFaucet,
  faToiletPaper,
  faBath,
  faBaby,
  faShirt,
  faUserTie,
  faBrush,
  faHammer,
  faWrench,
  faTractor,
  faChessQueen,
  faChessKnight,
  faGhost,
  faCandyCane,
  faBed,
  faKitchenSet,
  faToilet,
  faUserDoctor,
  faPersonBiking,
  faUserSecret,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { faAngry as farfaAngry } from "@fortawesome/free-regular-svg-icons";

// library.add(fab, faCheckSquare, faCoffee);
library.add(
  faCheckSquare,
  faCoffee,
  fasfaAngry,
  farfaAngry,
  faAppleWhole,
  faBell,
  faBicycle,
  faBolt,
  faPencil,
  faListCheck,
  faCheck,
  faClipboardCheck,
  faSquareCheck,
  faLockOpen,
  faXmark,
  faTrashCan,
  faQuestion,
  faInfo,
  faPeopleRoof,
  faBroom,
  faSoap,
  faSprayCanSparkles,
  faHouse,
  faCircleInfo,
  faCat, 
  faDog, 
  faDragon,
  faPaw,
  faUserAstronaut,
  faCar, 
  faToiletPortable,
  faWarehouse,
  faBook,
  faCakeCandles,
  faSocks,
  faBucket,
  faFaucet,
  faToiletPaper,
  faBath,
  faBaby,
  faShirt, 
faUserTie,
faBrush,
faBroom,
faHammer,
faWrench,
faTrashCan,
faChessQueen,
faChessKnight,
faGhost,
faCandyCane, 
faBath,
faBed, 
faKitchenSet,
faToilet,
faSoap, 
faUserDoctor,
faPersonBiking,
faUserSecret,
faRobot



);

const container = document.getElementById("root");
const root = createRoot(container);

export default function format(stringDate) {
  let inputDate = new Date(stringDate);
  let date, month, year;
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  return `${date}/${month}/${year}`;
}

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
