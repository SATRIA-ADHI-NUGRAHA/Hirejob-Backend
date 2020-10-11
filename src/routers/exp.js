const express = require('express')
const expControllers = require('../controllers/expController')
const router = express.Router()

router
.get('/getall',expControllers.getAll)
.get('/detail/:id_exprerience',expControllers.getDetail)
.post('/insert', expControllers.insert)
.get('/getexperience/:id', expControllers.getExp)
.put('/update/:id_exprerience',expControllers.update)
.patch('/update/:id_exprerience',expControllers.update)
.delete('/delete/:id_exprerience',expControllers.destroy)

module.exports = router