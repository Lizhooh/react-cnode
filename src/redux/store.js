import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const hasReduxTool = !!window.__REDUX_DEVTOOLS_EXTENSION__;

const devtool = (open) => (
    // 开启 redux devtool
    open &&
    hasReduxTool &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 中间件
const middleware = () => {
    return hasReduxTool ?
        compose(applyMiddleware(thunk), devtool(true)) :
        applyMiddleware(thunk);
};

export default createStore(
    combineReducers({
        ...reducers,
    }),
    middleware(),
);
