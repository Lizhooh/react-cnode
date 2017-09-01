import { ARTICLE } from '../types';
import api from '../../api';

export const init = (id) => async (dispatch, getState) => {
    const res = await api.article(id);
    if (res && res.success) {
        dispatch({
            type: ARTICLE.init_success,
            data: res.data, id,
            star: res.data.is_collect
        });
    }
}

export const star = (id) => async (dispatch, getState) => {
    const { id, star } = getState().article;

    const res = await (star ? api.unstar(id) : api.star(id));
    if (res && res.success) {
        dispatch({ type: ARTICLE.star_success, star: !star });
    }
}

export const createComment = (text) => async (dispatch, getState) => {
    const { id } = getState().article;
    const res1 = await api.createComment(id, text);

    if (res1 && res1.success) {
        const res2 = await api.article(id);
        if (res2 && res2.success) {
            dispatch({ type: ARTICLE.create_success, data: res2.data });
        }
    }
}
