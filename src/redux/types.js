

/** 扩展状态类型 */
const extendState = (obj) => {
    Object.keys(obj).forEach(key => {
        obj[key + '_in'] = obj[key] + '_in';                // 进行中
        obj[key + '_fail'] = obj[key] + '_fail';            // 失败了
        obj[key + '_success'] = obj[key] + '_success';      // 成功了
        obj[key + '_complete'] = obj[key] + '_complete';    // 完成了
    });
    return obj;
}

export const HOME = extendState({
    init: 'HOME_init',              // 初始化
    more: 'HOME_more',              // 更多
    next: 'HOME_next',              // next
    restore: 'HOME_restore',        // 恢复
    scrollindex: 'HOME_scrollindex',
});

export const ARTICLE = extendState({
    init: 'ARTICLE_init',
});

export const USER = extendState({
    info: 'USER_info',              // 用户信息
});
