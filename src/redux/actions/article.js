import { ARTICLE } from '../types';
import api from '../../api';

export const init = (id) => async (dispatch, getState) => {
    const res = await api.article(id)

    if (res && res.success) {
        dispatch({ type: ARTICLE.init_success, data: res.data, id });
    }
}
