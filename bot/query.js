const bot = require('./bot');
const {addCategory} = require('./helpers/category')

bot.on('callback_query', ({data, from}) => {
    const chatId = from.id;
    if(data == 'add_category') {
        addCategory(chatId)
    }
})