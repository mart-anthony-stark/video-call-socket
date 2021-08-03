const express = require('express')

const app = express() 
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {v4: uuidV4} = require('uuid')
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/', (req,res) => {
  res.render('index')
})

app.post('/room', (req,res) => {
  const {username, room} = req.body
  res.render('room', {room, username})
})


io.on('connection', socket => {
  socket.on('join-room', ({room, userId, username}) => {
    console.log({room, userId, username})
    socket.join(room)
    socket.broadcast.to(room).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.broadcast.to(room).emit('user-disconnected', userId)
    })
  })
})

server.listen(PORT, (err) => {
  if(err) console.log(err)
  else console.log(`Server started at port ${PORT}`)
})