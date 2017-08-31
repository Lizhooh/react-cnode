

const root_init_state = {
    appname: 'react-cnode',
}

export default (state = root_init_state, action) => {
    switch (action.type) {
        default: return state;
    }
}


export { default as home } from './home';
export { default as article } from './article';
export { default as user } from './user';
