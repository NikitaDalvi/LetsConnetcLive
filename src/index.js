/*jshint esversion:9*/
import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import {Provider} from 'react-redux';
import store from './redux/store';
import {persistGate} from 'redux-persist/integration/react';
import {persistor} from './redux/store';

ReactDom.render(
<Provider store={store}>
<BrowserRouter>
<persistGate persistor={persistor}>
  <App/>
</persistGate>
</BrowserRouter>
</Provider>,document.getElementById("root"));
