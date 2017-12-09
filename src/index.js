import React from 'react';
import ReactDOM from 'react-dom';
import './style/app.css';
import App from './router';
import registerServiceWorker from './registerServiceWorker';
import { readUser } from './storage';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

// import Perf from 'react-addons-perf';
// window.Perf = Perf;

(() => {
    window._login = false;
    let user = readUser();
    if (user !== null && user.id && user.accesstoken) {
        window._user = user;
        window._login = true;
    }
})();

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    ,
    document.getElementById('root')
);

registerServiceWorker();
