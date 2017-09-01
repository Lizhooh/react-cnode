import { ARTICLE } from '../types';

const init_state = {
    data: {},
    id: 0,
    replies: [],
    star: false,
}


export default (state = init_state, action) => {
    switch (action.type) {

        case ARTICLE.init_success: return {
            ...state,
            data: action.data,
            replies: action.data.replies,
            id: action.id,
            star: action.star || state.star,
        }

        case ARTICLE.star_success: return {
            ...state,
            star: action.star,
        }

        case ARTICLE.create_success: return {
            ...state,
            replies: action.data.replies,
        }

        default: return state;
    }
}
