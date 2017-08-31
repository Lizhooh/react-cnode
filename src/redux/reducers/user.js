import { USER } from '../types';


const init_state = {
    info: {
        recent_topics: [],
        recent_replies: [],
    },
};

export default (state = init_state, action) => {
    switch (action.type) {

        case USER.info_success: return {
            ...state,
            info: action.info,
        }

        default: return state;
    }
}
