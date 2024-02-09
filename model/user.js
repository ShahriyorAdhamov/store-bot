const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: String,
    phone: String,
    chatId: {
        required: true,
        type: Number 
    },
    admin: {
        type: Boolean,
        default: false
    },
    action: String,
    createdAt: Date,
    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', User)