require('dotenv').config();
require('./bot/bot')

const express = require('express');
const dbConnect = require('./db/connect');

dbConnect()