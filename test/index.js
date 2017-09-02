
function startTimeOf(time = '2017-08-30T03:28:11.446Z') {

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

console.log(
    startTimeOf()

)
