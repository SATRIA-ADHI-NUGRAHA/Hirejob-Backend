const mysql = require('mysql2')
const env = require('../helpers/env')

const db = mysql.createConnection({
    host: env.HOST,
    user: env.USER,
    password: env.PASS,
    database: env.DB
})

module.exports = db