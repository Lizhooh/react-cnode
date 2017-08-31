import { USER } from '../types';
import api from '../../api';

export const info = (name) => async (dispatch, getState) => {
    const res = await api.userInfo(name);

    if (res && res.success) {
        dispatch({ type: USER.info_success, info: res.data });
    }
};


