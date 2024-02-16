const bot = require("../bot");
const User = require("../../models/user");

async function start(msg) {
  const chatId = msg.chat.id;
  const checkUser = await User.findOne({ chatId });
  if (!checkUser) {
    const newUser = new User({
      name: msg.from.first_name,
      chatId,
      createdAt: new Date(),
      action: "request_contact",
    });

    await newUser.save();

    bot.sendMessage(
      chatId,
      `Привет ${msg.from.first_name}, оставьте свой номер`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "Отправить номер телефона",
                request_contact: true,
              },
            ],
          ],
          resize_keyboard: true,
        },
      }
    );
  }
}

async function requestContact(msg) {
  const chatId = msg.chat.id;
  if(msg.contact.phone_number) {
    const user = await User.findOne({ chatId });
    user.phone = msg.contact.phone_number;
    user.admin = msg.contact.phone_number === '+998946832323';
    user.action = 'menu';
    await user.save()
    bot.sendMessage(
      chatId, 
      `Выберите меню, ${user.admin? 'Admin': user.name}`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: 'Каталог'
              },
              user.admin && {
                text: 'Пользователи'
              }
            ]
          ],
          resize_keyboard: true
        }
      }
    )
  }
}
module.exports = { start, requestContact };
