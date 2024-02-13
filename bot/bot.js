const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '6889322248:AAF6lLBJBTrEnzkH7R98LdcGWK09yXD2pFc';

const bot = new TelegramBot(TOKEN, {polling: true});

module.exports = bot

require('./message')