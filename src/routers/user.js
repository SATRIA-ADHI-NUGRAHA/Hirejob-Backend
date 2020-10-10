const express = require('express')
const route = express.Router()
const { register, login, verify } = require('../controllers/userController')

route
.post('/register', register)
.post('/login', login)
.get('/verification/:token', verify)

module.exports = route