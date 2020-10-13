const express = require('express')
const route = express.Router()
const { addChat } = require('../controllers/Chat')

route
.post('/addChat', addChat)

module.exports = route