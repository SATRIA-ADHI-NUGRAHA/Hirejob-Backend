const express = require('express')
const { authenticate, authorize }  = require('../helpers/auth')
const expControllers = require('../controllers/expController')
const router = express.Router()

router
.get('/getall', authenticate, authorize, expControllers.getAll)
.get('/detail/:id', authenticate, authorize, expControllers.getDetail)
.post('/insert', authenticate, authorize, expControllers.insert)
.get('/getexperience/:id', authenticate, authorize, expControllers.getExp)
.put('/update/:id',authenticate, authorize, expControllers.update)
.patch('/update/:id', authenticate, authorize, expControllers.update)
.delete('/delete/:id', authenticate, authorize, expControllers.destroy)

module.exports = router
