import { get } from './http';

const prefix = 'https://cnodejs.org/api/v1';

const URLS = {
    topics: `${prefix}/topics`,
    article: `${prefix}/topic/:id`,
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

};
