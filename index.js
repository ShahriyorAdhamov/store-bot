const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const mongoose = require('mongoose');
const {config} = require('dotenv');
const dbConnect = require('./db/connect');

config();
const app = express();
const TOKEN = '6889322248:AAF6lLBJBTrEnzkH7R98LdcGWK09yXD2pFc'

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    if(msg.text = '/start') {
        const checkUser = await mongoose.findOne({chatId})

        if(!checkUser) {
            const newUser = new User({
                name: msg.from.first_name,
                chatId,
                createdAt: new Date(),
                action: 'start'
            })

            await newUser.save();
        }
    }
})

dbConnect()