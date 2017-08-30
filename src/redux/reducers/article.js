import { ARTICLE } from '../types';

const init_state = {
    data: {}
}


export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE.init_success: return {
            ...state,
            data: action.data,
        }

        default: return state;
    }
}
