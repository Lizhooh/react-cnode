import { get } from './http';

const prefix = 'https://cnodejs.org/api/v1';

const URLS = {
    topics: `${prefix}/topics`,
    article: `${prefix}/topic/:id`,
    userInfo: `${prefix}/user/:name`,
    userStar: `${prefix}/topic_collect/:name`,
};

export default {
    /**
     * 主题列表
     */
    topics: (type = '', page = 0, limit = 20) => get(URLS.topics, {
        query: {
            tab: type,
            limit,
            page,
        }
    }),

    /**
     * 文章信息
     */
    article: (id, accesstoken = '') => get(URLS.article.replace(/:id/, id), {
        query: {
            mdrender: true,
            accesstoken,
        }
    }),

    /**
     * 用户信息
     */
    userInfo: (name) => get(URLS.userInfo.replace(/:name/, name)),

    /**
     * 用户收藏
     */
    userStar: (name) => get(URLS.userStar.replace(/:name/, name)),
};
