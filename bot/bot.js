const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '6889322248:AAEKUzI7rP8pGnCAhcn57em08HHkQqgplCA';

const bot = new TelegramBot(TOKEN, {polling: true});

module.exports = bot

require('./query')
require('./message');
