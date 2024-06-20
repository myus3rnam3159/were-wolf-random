import { io } from 'socket.io-client'

const socket = io('http://172.16.0.68:3000', {
  rejectUnauthorized: false,
  reconnection: true,
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log('Socket connected:', socket.id)
})

socket.on('disconnect', () => {
  console.log('Socket disconnected:', socket.id)
})

socket.on('connect_error', (error) => {
  console.log('connect error', error.message)
})

export default socket
