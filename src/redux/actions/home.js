import { HOME } from '../types';
import api from '../../api';

export const init = (tag = 'all', active) => async (dispatch, getState) => {
    const { restore } = getState().home;
    if (restore && active === undefined) return;
    const res = await api.topics(tag, 1);
    if (res && res.success) {
        dispatch({ type: HOME.init_success, list: res.data, tag, active });
    }
}

export const more = () => async (dispatch, getState) => {
    const { tag, page } = getState().home;
    const res = await api.topics(tag, page);
    if (res && res.success) {
        dispatch({ type: HOME.more_success, list: res.data });
    }
}

export const saveScrollIndex = (index) => ({ type: HOME.scrollindex_success, index });
