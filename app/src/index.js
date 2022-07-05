import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faAngry as fasfaAngry, faAppleWhole, faBell, faBicycle, faBolt } from '@fortawesome/free-solid-svg-icons'
import { faAngry as farfaAngry } from '@fortawesome/free-regular-svg-icons'

// library.add(fab, faCheckSquare, faCoffee);
library.add( faCheckSquare, faCoffee, fasfaAngry, farfaAngry, faAppleWhole, faBell, faBicycle, faBolt);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
