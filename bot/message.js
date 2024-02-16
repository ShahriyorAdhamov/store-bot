const bot = require('./bot');
const {start, requestContact} = require('../bot/helpers/start');
const User = require('../models/user');
const { getAllUsers } = require('./helpers/users');
const {getAllCategories, newCategory} = require('./helpers/category')


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const user = await User.findOne({chatId});
    
    if(msg.text === '/start')
        start(msg);
    

    if(user) {
        if(user.action === 'request_contact' && !user.phone)
            requestContact(msg);
        

        if(msg.text ==='Пользователи')
            getAllUsers(msg);
        
        if(msg.text === 'Каталог') 
            getAllCategories(msg);

        if(user.action === 'add_category')
            newCategory(msg)
        
    }



})