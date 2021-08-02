const socket = io()

const myPeer = new Peer()
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)
})

socket.emit('join-room', {room: ROOM_ID, userId: 10})

socket.on('user-connected', (user) => {
  console.log(`${user} connected...`)
})

socket.on('user-disconnected', (user) => {
  console.log(`${user} disconnected...`)
})






function addVideoStream(video, stream){
  video.srcObject = stream
  video.addEventListener('loadedmetadata', ()=> {
    video.play()
  })
  .append(video)
}