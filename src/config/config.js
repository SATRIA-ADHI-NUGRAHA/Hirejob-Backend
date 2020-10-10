const mysql = require('mysql2')
const env = require('../helpers/env')

const db = mysql.createConnection({
    host: env.HOST,
    user: env.USER,
    password,
    database: env.DB
})

module.exports = db