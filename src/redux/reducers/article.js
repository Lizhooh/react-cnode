import { ARTICLE } from '../types';

const init_state = {
    data: {},
    id: 0,
}


export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE.init_success: return {
            ...state,
            data: action.data,
            id: action.id,
        }

        default: return state;
    }
}
