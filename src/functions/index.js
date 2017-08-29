import moment from 'moment';

// 大于 1000 时，显示 k
export const k = (value) => {
    if (value >= 1000) {
        value += '';
        value = value.substr(0, value.length - 2);
        return (value / 10).toFixed(1) + 'k';
    }
    return value;
};


// 计算时间
export function startTimeOf(time) {
    return moment(time).startOf('hour').fromNow();
}