const express = require('express')

const app = express() 
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {v4: uuidV4} = require('uuid')
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:id', (req,res) => {
  res.render('index', {id: req.params.id})
})


io.on('connection', socket => {
  socket.on('join-room', (room, userId) => {
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