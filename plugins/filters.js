import Vue from 'vue' // 时间格式化
export function numAddPlus(val) {
    if (val && Number(val) > 2) {
        return 10000 + '+'
    }

}

function getPostTime(obj, page) {
    let time = obj.post_time
    if (page == 'find') {
        time = obj.update_time
    }
    time = parseInt(time)
    let newTime = new Date().getTime() - time;

    let timeArr = [],
        timeStrArr = ['年前', '月前', '天前', '小时前', '分钟前'],
        returnTime = '';
    timeArr.push(Math.floor(newTime / 1000 / 60 / 60 / 24 / 365));
    timeArr.push(Math.floor(newTime / 1000 / 60 / 60 / 24 / 30));
    timeArr.push(Math.floor(newTime / 1000 / 60 / 60 / 24));
    timeArr.push(Math.floor(newTime / 1000 / 60 / 60));
    timeArr.push(Math.floor(newTime / 1000 / 60));
    if (timeArr[4] <= 0) {
        timeArr[4] = 1
    }
    timeArr.find((item, index) => {
        if (item > 0) return returnTime = item + timeStrArr[index];
    })
    return returnTime;
}
let filters = { numAddPlus, getPostTime }
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })
export default filters