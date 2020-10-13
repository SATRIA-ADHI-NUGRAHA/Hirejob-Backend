const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../helpers/auth')
const portfolioCont = require('../controllers/Chat')

router
  .post('/addfriends', authenticate, authorize, portfolioCont.addFriends)
  .get('/friends/:id', authenticate, authorize, portfolioCont.getFriends)
  .post('/addChat', addChat)

module.exports = router
