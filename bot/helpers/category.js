const bot = require('../bot');
const User = require('../../models/user');
const Category = require('../../models/category')

async function getAllCategories(chatId, page = 1) {
    let limit = 5;
    let skip = limit * (page - 1)
    const categoriesList = await Category.find().skip(skip).limit(limit);
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
        getAllCategories(chatId);

    } else {
        bot.sendMessage(chatId, 'У вас нет прав на эту команду')
    }
}

async function categoriesPagination(chatId, action) {
    const user = await User.findOne({chatId});
    if(user) {
        let page = 1;
        if(action === 'next_category') {
            if(user.action.includes('category-page_')) {
                page = user.action.split('_')[1];
                page++;
            } else {
                user.action = `category-page_${page}`;
            }
        } else {
            if (user.action.split('_')[1] > 0) {
                page = user.action.split('_')[1];
                page--;
            }
        }

        user.action = `category-page_${page}`;
        await user.save();
        getAllCategories(chatId, page);
    }
}

module.exports = {getAllCategories, addCategory, newCategory, categoriesPagination}