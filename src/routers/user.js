const express = require('express')
const route = express.Router()
const { register, login, verify, updateUser, getUser, deleteUser, resetPass, confirmPass } = require('../controllers/userController')
const upload = require('../helpers/upload')

route
.post('/register', register)
.post('/login', login)
.get('/verification/:token', verify)
.patch('/edit/:id',upload.single('image'), updateUser)    
.get('/:id', getUser)
.delete('/delete/:id', deleteUser)
.post('/reset-pass', resetPass)
.post('/reset-confirm', confirmPass)

module.exports = route