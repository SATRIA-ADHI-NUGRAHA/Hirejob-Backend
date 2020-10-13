const express = require('express')
const { authenticate, authorize }  = require('../helpers/auth')
const expControllers = require('../controllers/expController')
const router = express.Router()

router
.get('/getall', authenticate, authorize, expControllers.getAll)
.get('/detail/:id_exprerience', authenticate, authorize, expControllers.getDetail)
.post('/insert', authenticate, authorize, expControllers.insert)
.get('/getexperience/:id', authenticate, authorize, expControllers.getExp)
// .put('/update/:id_exprerience',authenticate, authorize, expControllers.update)
.patch('/update/:id_exprerience', authenticate, authorize, expControllers.update)
.delete('/delete/:id_exprerience', authenticate, authorize, expControllers.destroy)

module.exports = router