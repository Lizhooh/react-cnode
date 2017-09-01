import _nprogress from 'nprogress';

// 大于 1000 时，显示 k
export const k = (value) => {
    if (value >= 1000) {
        value += '';
        value = value.substr(0, value.length - 2);
        return (value / 10).toFixed(1) + 'k';
    }
    return value;
};

// 计算时间差
export function startTimeOf(time) {
    if (time === undefined) {
        return '';
    }
    // 2017-08-30T03:28:11.446Z
    const _time = new Date(time).getTime();
    const _now = Date.now();

    const dt = (_now - _time) / 1000 | 0;
    const dt_second = dt / 1000 | 0;
    const dt_minute = dt / 60 | 0;
    const dt_hour = dt / 3600 | 0;
    const dt_day = dt / 86400 | 0;
    const dt_month = dt / 2592000 | 0;
    const dt_year = dt / 31104000 | 0;

    let arr = [
        [dt_year, '年前'],
        [dt_month, '月前'],
        [dt_day, '天前'],
        [dt_hour, '小时前'],
        [dt_minute, '分钟前'],
        [dt_second, '秒前'],
    ];

    for (let i of arr) {
        if (i[0] !== 0) {
            return i[0] + ' ' + i[1];
        }
    }

    return `0 秒前`;
}


export const scrollInfo = {
    t: () => document.documentElement.scrollTop || document.body.scrollTop,
    H: () => document.documentElement.scrollHeight || document.body.scrollHeight,
    h: () => document.documentElement.clientHeight || document.body.clientHeight,
}


_nprogress.configure({ easing: 'ease', speed: 500 });
export const nprogress = _nprogress;
