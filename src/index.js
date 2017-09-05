import React from 'react';
import ReactDOM from 'react-dom';
import './style/app.css';
import App from './router';
import registerServiceWorker from './registerServiceWorker';
import { readUser } from './storage';

(() => {
    window._login = false;
    let user = readUser();
    if (user !== null && user.id && user.accesstoken) {
        window._user = user;
        window._login = true;
    }
})();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
