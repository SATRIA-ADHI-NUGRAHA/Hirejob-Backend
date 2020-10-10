const express = require('express')
const companyControllers = require('../controllers/companyController')
const router = express.Router()
// const upload = require('../helper/upload')


router
.get('/getall',companyControllers)
.get('/detail/:id_company',companyControllers)
.post('/insert', companyControllers)
.put('/update/:id_company',upload.single('image_com'),companyControllers)
.delete('/delete/:id_company',companyControllers)

module.exports = router