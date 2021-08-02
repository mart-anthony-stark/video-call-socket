const socket = io()

socket.emit('join-room', {room: ROOM_ID, userId: 10})

socket.on('user-connected', (user) => {
  console.log(`${user} connected...`)
})

socket.on('user-disconnected', (user) => {
  console.log(`${user} disconnected...`)
})