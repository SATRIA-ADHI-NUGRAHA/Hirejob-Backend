const express = require('express')
const http = require('http')
const app = express()
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = http.createServer(app)
// const io = require(server)
const env = require('./src/helpers/env')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

server.listen(env.PORT, () => {
    console.log(`Server running at port ${env.PORT}`);
})
