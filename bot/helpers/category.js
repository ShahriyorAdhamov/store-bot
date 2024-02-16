const bot = require('../bot');
const User = require('../../models/user');
const Category = require('../../models/category')

async function getAllCategories(msg) {
    const chatId = msg.chat.id;
    const categoriesList = await Category.find();
    const user = await User.findOne({ chatId });
    const categories = categoriesList.map(item => 
        {
            return [
                {
                    text: item.title,
                    callback_data: `category_${item._id}`
                }
            ]
        }
    )
    bot.sendMessage(
        chatId, 
        'Список категорий',
        {
            reply_markup: {
                remove_keyboard: true,
                inline_keyboard: [
                    ...categories,
                    [
                        {
                            text: 'prev',
                            callback_data: 'prev_category'
                        },
                        {
                            text: '1',
                            callback_data: 'page_number'
                        },
                        {
                            text: 'next',
                            callback_data: 'next_category'
                        }
                    ],
                    user.admin ? [
                        {
                            text: 'Добавить категорию',
                            callback_data: 'add_category'
                        }
                    ] : ''
                ]
            }
        })
}


async function addCategory(chatId) {
    const user = await User.findOne({chatId});
    if(user?.admin) {
        user.action = 'add_category';
        await user.save();
        bot.sendMessage(chatId, 'Введите название категории')
    } else {
        bot.sendMessage(chatId, 'У вас нет прав на эту команду')
    }
}

async function newCategory(msg) {
    const chatId = msg.chat.id;
    const user = await User.findOne({chatId});
    const title = msg.text;   

    if(user?.admin) {
        const newCategory = new Category({
            title
        });
        await newCategory.save();
        await User.findOneAndUpdate(
            {chatId}, 
            {
                ...user,
                action: 'category'
            }
        );
        getAllCategories(msg);

    } else {
        bot.sendMessage(chatId, 'У вас нет прав на эту команду')
    }
}

module.exports = {getAllCategories, addCategory, newCategory}