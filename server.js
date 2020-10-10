const express = require('express')
const http = require('http')
const app = express()
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = http.createServer(app)
const path = require('path')
// const io = require(server)
const env = require('./src/helpers/env')
const db = require('./src/config/config')
const user = require('./src/routers/user')
// const company = require('./src/routers/company')

db.connect((err) => {
    if(err) throw err
    console.log('Database connected');
})

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('src/img'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/v1/user', user)

server.listen(env.PORT, () => {
    console.log(`Server running at port ${env.PORT}`);
})
