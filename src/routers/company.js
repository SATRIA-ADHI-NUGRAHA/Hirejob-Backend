const express = require('express')
const companyControllers = require('../controllers/companyController')
const router = express.Router()
const upload = require('../helpers/upload')

router
.get('/getall',companyControllers.getAll)
.get('/detail/:id_company',companyControllers.getDetail)
.post('/insert', companyControllers.insert)
.put('/update/:id_company',upload.single('image_com'),companyControllers.update)
.delete('/delete/:id_company',companyControllers.destroy)

module.exports = router