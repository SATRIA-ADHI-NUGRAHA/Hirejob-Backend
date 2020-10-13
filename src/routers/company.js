const express = require('express')
const { authorize, authenticate } = require('../helpers/auth')
const companyControllers = require('../controllers/companyController')
const router = express.Router()
const upload = require('../helpers/upload')

router
.get('/getall', authenticate, authorize, companyControllers.getAll)
.get('/detail/:id_company', authenticate, authorize, companyControllers.getDetail)
.post('/insert', authenticate, authorize, companyControllers.insert)
// .put('/update/:id_company', authenticate, authorize, upload.single('image_com'),companyControllers.update)
.patch('/update/:id_company', authenticate, authorize, upload.single('image_com'),companyControllers.update)
.delete('/delete/:id_company', authenticate, authorize, companyControllers.destroy)

module.exports = router