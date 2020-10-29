const express = require('express')
const http = require('http')
const app = express()
const socketIo = require('socket.io')
const bodyParser = require('body-parser')
const cors = require('cors')
const server = http.createServer(app)
const path = require('path')
const io = socketIo(server)
const env = require('./src/helpers/env')
const db = require('./src/config/config')
const user = require('./src/routers/user')
const company = require('./src/routers/company')
const portfolio = require('./src/routers/portfolio')
const experience = require('./src/routers/exp')
const chat = require('./src/routers/chat')
const chatModel = require('./src/models/chat')
const { success, failed } = require('./src/helpers/response')

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
io.on('connection', (socket) => {
socket.on('send-message-hire', (payload) => {
chatModel.insertChat(payload)
        .then(result => {
            io.emit('res-hire', result)
        }).catch(err => {
           console.log(err);
        })
})
socket.on('get-friends', (payload) => {
         //console.log(payload);
        chatModel.getFriends(payload.id)
            .then((result) => {
//console.log(result)
                io.emit('userList', result)
            })
    })
socket.on('get-message', (payload) => {
        chatModel.getMessage(payload)
            .then((result) => {
                io.to(payload.sender).emit('list-message', result)
                // io.emit('chatting', (result))
            }).catch((err) => {
                console.log(err);
            })
    })

socket.on('send-message', (payload) => {
chatModel.insertChat(payload)
//chatModel.getMessage(payload)
        .then(result => {
            io.to(payload.receiver).emit('list-message', payload)
        }).catch(err => {
           console.log(err);
        })
})

socket.on('get-history-message', (payload) => {
        chatModel.getMessage(payload)
            .then((result) => {
                io.to(payload.sender).emit('history-message', result)
io.to(payload.receiver).emit('history-message', result)

                // io.emit('chatting', (result))
            }).catch((err) => {
                console.log(err);
            })
    })

socket.on('join-room', (payload) => {
        socket.join(payload)
    })
    console.log('user online');
})

app.use('/v1/user', user)
app.use('/v1/company',company)
app.use('/v1/portfolio', portfolio)
app.use('/v1/experience', experience)
app.use('/v1/chat', chat)

server.listen(env.PORT, () => {
    console.log(`Server running at port ${env.PORT}`);
})
