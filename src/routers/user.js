const express = require('express')
const { authenticate, authorize } = require('../helpers/auth')
const route = express.Router()
const { register, login, verify, updateUser, getUser, deleteUser, resetPass, confirmPass, getAll, userGetRole } = require('../controllers/userController')
const upload = require('../helpers/upload')

route
.post('/register', register)
.post('/login', login)
.get('/verification/:token', verify)
.patch('/edit/:id', authenticate, authorize, upload.single('image'), updateUser)    
.get('/:id',authenticate, authorize, getUser)
.delete('/delete/:id',authenticate, authorize, deleteUser)
.post('/reset-pass', resetPass)
.post('/reset-confirm', confirmPass)
.get('/',authenticate, authorize, getAll )

module.exports = route