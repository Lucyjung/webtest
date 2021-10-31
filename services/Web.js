
const axios = require('axios')
const config = require('../config/bot')
const lineConfig = require('../config/line');
const qs = require('qs');
module.exports = {
    check : async () => {
        let status = false
        try {
            let response = await axios(config.url_to_test)
            status = true
            if (response.status != 200){
                await sendLineNoti('Error : ' + config.url_to_test + ' response with status ' + response.status)
            }
        } catch (e){
            status = false
            await sendLineNoti('Error : ' + config.url_to_test + ' response with error ' + e.toString())
        }
        return
    }
};
async function sendLineNoti (text) {
    const msg = {message : text};
    const options = {
        method: 'POST',
        headers: { 
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + lineConfig.token},
        data: qs.stringify(msg)
    };
    try {
        await axios.post('https://notify-api.line.me/api/notify', qs.stringify(msg), options)
    }
    catch (e){
        console.log(e)
    }
    return 
}