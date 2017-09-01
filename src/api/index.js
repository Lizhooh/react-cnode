import { get, post } from './http';
import { readUser } from '../storage';

const prefix = 'https://cnodejs.org/api/v1';


const API = {
    topics: `${prefix}/topics`,
    article: `${prefix}/topic/:id`,
    userInfo: `${prefix}/user/:name`,
    userStar: `${prefix}/topic_collect/:name`,
    checkToken: `${prefix}/accesstoken`,
    star: `${prefix}/topic_collect/collect`,
    unstar: `${prefix}/topic_collect/de_collect`,
    createComment: `${prefix}/topic/:id/replies`,
};

export default {
    /**
     * 主题列表
     */
    topics: (type = '', page = 0, limit = 20) => get(API.topics, {
        query: {
            tab: type,
            limit,
            page,
        }
    }),

    /**
     * 文章信息
     */
    article: (id, accesstoken = '') => {
        const tk = (readUser() || {}).accesstoken;

        return get(API.article.replace(/:id/, id), {
            query: {
                mdrender: true,
                accesstoken: tk || '',
            }
        })
    },


    /**
     * 用户信息
     */
    userInfo: (name) => get(API.userInfo.replace(/:name/, name)),

    /**
     * 用户收藏
     */
    userStar: (name) => get(API.userStar.replace(/:name/, name)),

    /**
     * 检查 token
     */
    checkToken: (tk) => post(API.checkToken, {
        data: { accesstoken: tk },
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        }
    }),

    /**
     * 收藏
     */
    star: (id) => {
        const tk = (readUser() || {}).accesstoken;
        return post(API.star, {
            data: {
                accesstoken: tk,
                topic_id: id,
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        });
    },

    /**
     * 取消收藏
     */
    unstar: (id) => {
        const tk = (readUser() || {}).accesstoken;
        return post(API.unstar, {
            data: {
                accesstoken: tk,
                topic_id: id,
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        });
    },

    /**
     * 新建评论
     */
    createComment: (id, content) => {
        const tk = (readUser() || {}).accesstoken;
        return post(API.createComment.replace(/:id/, id), {
            data: {
                accesstoken: tk,
                content,
            },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            }
        })
    },


};
