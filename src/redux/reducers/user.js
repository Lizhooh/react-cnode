import { USER } from '../types';


const init_state = {
    info: {
        recent_topics: [],
        recent_replies: [],
    },
    stars: [],
    msgs: {
        read: [],
        notread: [],
    },
};

export default (state = init_state, action) => {
    switch (action.type) {

        case USER.init_success: return {
            ...state,
            info: action.info,
            stars: action.stars,
            msgs: action.msgs,
        }

        default: return state;
    }
}
