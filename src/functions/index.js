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
export function startTimeOf(_time) {
    if (_time === undefined) {
        return '';
    }
    // 2017-08-30T03:28:11.446Z
    let nowstr = new Date().toISOString();
    let timestr = new Date(_time).toISOString();

    const [ny, nm, nd] = `${nowstr.match(/^\d{4}-\d{1,2}-\d{1,2}/)}`.split('-');
    const [ty, tm, td] = `${timestr.match(/^\d{4}-\d{1,2}-\d{1,2}/)}`.split('-');

    const [nh, nmin, ns] = `${nowstr.match(/\d{1,2}:\d{1,2}:\d{1,2}/)}`.split(':');
    const [th, tmin, ts] = `${timestr.match(/\d{1,2}:\d{1,2}:\d{1,2}/)}`.split(':');

    let now = {
        year: ny,
        month: nm,
        day: nd,
        hour: nh,
        minute: nmin,
        second: ns,
    };

    let time = {
        year: ty,
        month: tm,
        day: td,
        hour: th,
        minute: tmin,
        second: ts,
    };

    let keys = {
        year: '年',
        month: '月',
        day: '日',
        hour: '小时',
        minute: '分钟',
        second: '秒',
    };

    // 秒前，分前，时前，日前，月前，年前。
    for (let key in keys) {
        if (now[key] !== time[key]) {
            let dt = now[key] - time[key];
            // 发生在未来
            if (dt < 0) {
                return `${-dt} ${keys[key]}后`
            }
            else {
                return `${dt} ${keys[key]}前`
            }
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
