import { HOME } from '../types';

const init_state = {
    list: [],
    page: 1,
    tag: 'all',
    scrollIndex: 0,             // 记录滚动条位置
    restore: false,
    active: 0,
    showNext: false,            // 下一页
}

export default (state = init_state, action) => {
    switch (action.type) {

        case HOME.init_success: return {
            ...state,
            list: action.list,
            page: init_state.page + 1,
            tag: action.tag,
            scrollIndex: 0,
            restore: false,
            active: action.active || state.active,
        }

        case HOME.more_success: return {
            ...state,
            list: [...state.list, ...action.list],
            page: state.page + 1,
            restore: false,
            showNext: action.next || state.showNext,
        }

        case HOME.next_success: return {
            ...state,
            list: action.list,
            page: state.page + 1,
            showNext: action.next,
        }

        case HOME.scrollindex_success: return {
            ...state,
            restore: true,
            scrollIndex: action.index,
        }

        default: return state;
    }
}
