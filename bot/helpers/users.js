const bot = require("../bot");
const User = require("../../models/user");

async function getAllUsers(msg) {
    const chatId = msg.from.id;
    const user = await User.findOne({chatId});


    if(user.admin) {
        const allUsers = await User.find();
        const message = allUsers
            .map(user => user)
            .join(' ')
        bot.sendMessage(
            chatId,
            message
        )
    } else {
        bot.sendMessage(
            chatId, 
            'У вас нет прав на эту команду',
            {
                reply_markup: {
                    keyboard: [
                        [
                            'Каталог'
                        ]
                    ]
                }
            });
    }
}

module.exports = {getAllUsers}