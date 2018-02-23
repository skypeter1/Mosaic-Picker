const css = require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <div>
            <h1 className = "title" >Hello from App</h1>
            <p>Testing rendering with JSX</p>
        </div>
    )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
 );

// import css from './app.scss';

 console.log("Testing Hot Module Replacement");