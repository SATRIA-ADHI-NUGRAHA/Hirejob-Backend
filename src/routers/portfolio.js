const express = require('express')
const { authenticate, authorize } = require('../helpers/auth')
const router = express.Router()
const upload = require('../helpers/upload')
const portfolioCont = require('../controllers/portfolioCont')

router
  .get('/findall', authenticate, authorize, portfolioCont.findAll)
  .get('/findone/:id', authenticate, authorize, portfolioCont.findOne)
  .post('/insertone', authenticate, authorize, portfolioCont.insertOne)
  .patch('/updateone/:id', authenticate, authorize, upload.single('image_port'), portfolioCont.updateOne)

module.exports = router