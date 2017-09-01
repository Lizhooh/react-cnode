import React from 'react';
import ReactDOM from 'react-dom';
import './style/app.css';
import App from './router';
// import registerServiceWorker from './registerServiceWorker';
window._login = false;

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
