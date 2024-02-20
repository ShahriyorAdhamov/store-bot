const bot = require('./bot');
const {addCategory, categoriesPagination} = require('./helpers/category');

bot.on('callback_query', ({data, from}) => {
    const chatId = from.id;
    if(data === 'add_category')
        addCategory(chatId);


    if(data === ('next_category' || 'prev_category'))
        categoriesPagination(chatId, data);

})

