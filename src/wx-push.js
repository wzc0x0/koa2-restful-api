/**
 * wechat push every day
 */

// const server_url = "https://sc.ftqq.com/SCU33763Tb8f7eb762daee1d229e09c597c4333db5bbc6e0d3d7c0.send";
const server_url = "https://pushbear.ftqq.com/sub";
const soup_url = "https://open.iciba.com/dsapi/";
const weather_url = "https://restapi.amap.com/v3/weather/weatherInfo?city=310000&key=0de8edd7581c8b8b1ddba446de3383ed&extensions=all";
const chinese_week = "一二三四五六七";
const sendkey = "6033-584b46b50fa2d6cce39db7e25cba0e53"

const axios = require('axios');
const qs = require('querystring');
const schedule = require('node-schedule');
const log4js = require('log4js');

log4js.configure({
    appenders: {
        wxPush: {
            type: 'dateFile', // 日志类型
            filename: 'wx-push', // 输出的文件名
            pattern: '-yyyy-MM-dd.log', // 文件名增加后缀
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['wxPush'],
            level: 'info'
        }
    }
})
const log = log4js.getLogger('wxPush')

const push_wx = (text, desp) => {
    axios.post(server_url, qs.stringify({ sendkey, text, desp }))
        .then(({ data }) => {
            log.info(data)
        })
        .catch(err => {
            log.error(err);
        })
}


const get_weather = new Promise((resolve, reject) => {
    axios.get(weather_url).then(({ data }) => {
        if (data['status'] === '1') {
            resolve(data['forecasts'][0]['casts'][0])
        }
    })
})

const get_soup = new Promise((resolve, reject) => {
    axios.get(soup_url).then(({ data }) => {
        let {
            dateline,
            content,
            note,
            picture,
            translation
        } = data
        resolve({
            dateline,
            content,
            note,
            picture,
            translation
        })
    })
})

const package_content = () => {
    Promise.all([get_weather, get_soup]).then(arrVal => {
        let title = "早上好！",
            desp = `#### ${arrVal[0]['date']} 星期${chinese_week[arrVal[0]['week'] - 1]}\n` +
            `白天${arrVal[0]['dayweather']}，夜晚${arrVal[0]['nightweather']}，温度${arrVal[0]['nighttemp']}℃ ~ ${arrVal[0]['daytemp']}℃。  \n` +
            `*${arrVal[1]['content']}*  \n` +
            `${arrVal[1]['note']}\n` +
            `![logo](${arrVal[1]['picture']})  \n` +
            `${arrVal[1]['translation']}`;

        push_wx(title, desp);
    }).catch(err => {
        log.error(err)
        setTimeout(() => {
            package_content()
        }, 3000);
    })
}

log.info('The job start!')
    // every day 8:00:10 clock
const job = schedule.scheduleJob('10 0 8 * * *', function() {
    log.info('start!')
    package_content()
})