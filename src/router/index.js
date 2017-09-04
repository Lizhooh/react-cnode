import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../redux/store';

import Home from '../views/home';
import Article from '../views/article';
import User from '../views/user';
import NotFound from '../views/notfound';
import Login from '../views/login';
import Create from '../views/create';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/article/:id" component={Article} />
                        <Route exact path="/user/:id?" component={User} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/create" component={Create} />
                        <Redirect from="/*" to="/home" />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
