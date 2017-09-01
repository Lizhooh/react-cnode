import { USER } from '../types';
import api from '../../api';

export const init = (name) => async (dispatch, getState) => {
    const [res1, res2] = await Promise.all([
        api.userInfo(name),
        api.userStar(name),
    ]);

    if (res1 && res2 && res1.success && res2.success) {
        dispatch({ type: USER.init_success, info: res1.data, stars: res2.data });
    }
};


