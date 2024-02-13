const bot = require('./bot');
const {start, requestContact} = require('../bot/helpers/start')
const User = require('../model/user')

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const user = await User.findOne({chatId})
    
    if(msg.text === '/start') {
        start(msg)
    }

    if(user) {
        if(user.action === 'request_contact' && !user.phone) {
            requestContact(msg)
        }
    }
})