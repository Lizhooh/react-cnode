
/**
 * 加密
 * 右 + 5，再逆转
 * @param{String} str
 * @return{String}
 */
function encrypt(str) {
    let randNumber = Math.random() * 100 | 0;
    let arr = [];
    for (let i = 0, len = str.length; i < len; i++) {
        arr.push(str[i].charCodeAt() + randNumber);
    }
    arr.reverse();
    return arr.join('-') + '-' + randNumber;
}

/**
 * 解密
 * 逆转，再 - 5
 * @param{String} str
 * @return{String}
 */
function discrypt(str = '') {
    let lastIndex = str.lastIndexOf('-');
    let randNumber = str.slice(lastIndex + 1);
    let arr = [];
    str = str.slice(0, lastIndex);
    str = str.split('-').reverse();
    for (let i = 0, len = str.length; i < len; i++) {
        arr.push(String.fromCharCode(str[i] - randNumber));
    }
    return arr.join('');
}

const LS = window.localStorage;

const storage = {
    get(key) {
        if (this.has(key)) {
            return JSON.parse(discrypt(LS.getItem(key)));
        }
        else return null;
    },
    set(key, value) {
        return LS.setItem(key, encrypt(JSON.stringify(value)));
    },
    has(key) {
        return LS.getItem(key) !== null;
    },
    remove(key) {
        return LS.removeItem(key);
    },
}

/*
    loginname:
    id:
    avatar_url:
    accesstoken:
    timestamp:
*/
export const saveUser = (user) => {
    return storage.set('user', user);
}

export const readUser = () => {
    if (storage.has('user')) {
        return storage.get('user');
    }
    else {
        return null;
    }
}
