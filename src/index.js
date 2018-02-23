const css = require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
 );

// import css from './app.scss';

console.log("Testing Hot Module Replacement");