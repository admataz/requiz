import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import store from './js/store';
import App from './js/App';


const d = document.getElementById('app');



if (d) {
  render(
  <Provider store={store}>
  <App />
  </Provider>
  , d )
};
 

