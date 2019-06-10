import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App url = "https://raw.githubusercontent.com/jigjp/intern_exam/master/fukui_event.json" />,
  document.getElementById('root')
);

serviceWorker.unregister();
