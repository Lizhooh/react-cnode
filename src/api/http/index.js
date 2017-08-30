import { nprogress } from '../../functions';

function parse(query) {
    let arr = [];
    for (let i in query) {
        arr.push(`${i}=${query[i]}`);
    }
    return arr.join('&');
}

/**
 * 自定义的 http 请求
 * @param{String} method: http method
 * @param{String} url: 地址
 * @param{Object} options: 配置
 * @returns{Promise}
 */
const _http = (method, url, { query = {}, data = {} } = {}) => {
    nprogress.start().set(0.5);
    url += '?' + parse(query);

    return fetch(url, {
        method: method,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection': 'keep-alive',
        },
        data: JSON.stringify(data),
    })
        .then(res => {
            nprogress.done();
            return res.json()
        })
        .catch(err => {
            console.error(err);
            console.log(`${method} error: ${url}`);
        })
        ;
}


export const get = (...args) => _http('GET', ...args);
export const post = (...args) => _http('POST', ...args);

