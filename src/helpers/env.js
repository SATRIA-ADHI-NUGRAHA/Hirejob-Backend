require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASS: process.env.PASS,
    DB: process.env.DATABASE,
    USERMAIL: process.env.USEREMAIL,
    PASSMAIL: process.env.USERPASS,
    SECRETKEY: process.env.SECRET,
    HOSTURL: process.env.HOSTURL
}