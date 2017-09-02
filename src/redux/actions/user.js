import { USER } from '../types';
import api from '../../api';

export const init = (name) => async (dispatch, getState) => {

    const [res1, res2, res3] = await Promise.all([
        api.userInfo(name),
        api.userStar(name),
        api.messages(),
    ]);

    if (res1.success && res2.success && res3.success) {
        let data = {
            ...res3.data,
            read: res3.data.has_read_messages.slice(0, 10),
            notread: res3.data.hasnot_read_messages,
        };

        dispatch({
            type: USER.init_success,
            info: res1.data,
            stars: res2.data,
            msgs: data,
        });
    }
};

export const mark = (id) => {
    api.messageMark(id);
}
