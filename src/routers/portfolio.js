const express = require('express')
const router = express.Router()
const upload = require('../helpers/upload')
const portfolioCont = require('../controllers/portfolioCont')

router
  .get('/findall', portfolioCont.findAll)
  .get('/findone/:id', portfolioCont.findOne)
  .post('/insertone', portfolioCont.insertOne)
  .patch('/updateone/:id',upload.single('image_port'), portfolioCont.updateOne)

module.exports = router