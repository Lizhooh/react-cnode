import { HOME } from '../types';
import api from '../../api';

// 初始化
export const init = (_tag, active) => async (dispatch, getState) => {
    const { restore, tag} = getState().home;
    if (restore && active === undefined) return;

    const res = await api.topics(_tag || tag, 1);

    if (res && res.success) {
        dispatch({ type: HOME.init_success, list: res.data, tag, active });
    }
}

// 加载更多
export const more = () => async (dispatch, getState) => {
    const { tag, page, list } = getState().home;
    const res = await api.topics(tag, page)

    if (res && res.success) {
        // 大于 120 项时，不自动加载
        if (list.length + res.data.length >= 120) {
            dispatch({ type: HOME.more_success, list: res.data, next: true });
        }

        dispatch({ type: HOME.more_success, list: res.data });
    }
}

// 下一页
export const next = () => async (dispatch, getState) => {
    const { page, tag } = getState().home;

    const res = await api.topics(tag, page)

    if (res && res.success) {
        dispatch({ type: HOME.next_success, list: res.data, next: false });
    }
}


export const saveScrollIndex = (index) => ({ type: HOME.scrollindex_success, index });
