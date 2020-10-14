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
