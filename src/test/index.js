
function startTimeOf() {
    // 2017-08-30T03:28:11.446Z
    let nowstr = '2017/8/30 下午5:43:11';
    let timestr = '2017/8/30 上午11:01:33';

    const [ny, nm, nd] = `${nowstr.match(/^\d{4}\/\d{1,2}\/\d{1,2}/)}`.split('/');
    const [ty, tm, td] = `${timestr.match(/^\d{4}\/\d{1,2}\/\d{1,2}/)}`.split('/');

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

    console.log(now);
    console.log(time);

    // 秒前，分前，时前，日前，月前，年前。
    for (let key in keys) {
        if (now[key] !== time[key]) {
            let dt = now[key] - time[key];
            // 发生在未来
            if (dt < 0) {
                return `${dt} ${keys[key]}后`
            }
            else {
                return `${dt} ${keys[key]}前`
            }
        }
    }

    return `0 秒前`;
}

console.log(startTimeOf());
