import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


import {Provider} from 'react-redux';
import Store from './Store';

import {positions,transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createRoot } from "react-dom/client";

const options= {

  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}
const container=document.getElementById('root')
const root=createRoot(container);
root.render(
  <Provider store={Store}>
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>,
 
);


