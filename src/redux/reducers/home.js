import { HOME } from '../types';

function parse(str) {
    if (str[0] === '?') str = str.slice(1);

    let arr = str.split('&');
    let params = {};

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i].split('=');
        params[item[0]] = item[1];
    }

    return params;
}
// 获取查询字段，决定初始化 tag 类型
const _tag = parse(window.location.search).tag;

const init_state = {
    list: [],
    page: 1,
    tag: _tag || 'all',
    scrollIndex: 0,             // 记录滚动条位置
    restore: false,
    active: ['all', 'good', 'ask', 'shar', 'job'].findIndex(i => i === _tag),
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
            showNext: false,
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
