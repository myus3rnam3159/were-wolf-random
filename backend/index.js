const server = require('http').createServer()
const io = require('socket.io')(server)

const { ROLES, DEFAULT_ROOMS } = require('./constants')
const { getRandomRole } = require('./role-handler')

let rooms = DEFAULT_ROOMS

io.on('connection', (socket) => {
  const noticeRoomChange = (roomId) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    io.to(roomId).emit('room-change', rooms[roomIndex])
  }

  socket.on('disconnect', () => {
    rooms = rooms.map((room) => {
      const playerIndex = room.players.findIndex(
        (p) => p.socketId === socket.id
      )
      if (playerIndex > -1 && !room.isPlaying) {
        room.players.splice(playerIndex, 1)
        noticeRoomChange(room.id)
      }
      return room
    })
  })

  socket.on('request-room-list', () => {
    socket.emit('room-list', rooms)
  })

  socket.on('join-room', ({ roomId, player }) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    if (roomIndex > -1) {
      const playerIndex = rooms[roomIndex].players.findIndex(
        (p) => p.id === player?.id
      )
      if (playerIndex === -1) {
        player.socketId = socket.id
        rooms[roomIndex].players.push(player)
        socket.join(roomId)
      }
      noticeRoomChange(roomId)
      socket.emit('room-list', rooms)
    }
  })

  socket.on('leave-room', (roomId, player) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    if (roomIndex > -1) {
      rooms[roomIndex].players = rooms[roomIndex].players.filter(
        (p) => p.id === player?.id
      )
      socket.leave(roomId)
      noticeRoomChange(roomId)
    }
  })

  socket.on('change-to-moderator', ({ roomId, player }) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    if (roomIndex > -1) {
      const playerIndex = rooms[roomIndex].players.findIndex(
        (p) => p.id === player?.id
      )
      const oldModIndex = rooms[roomIndex].players.findIndex(
        (p) => p.role === ROLES.MODERATOR
      )
      if (playerIndex > -1) {
        rooms[roomIndex].players[playerIndex].role = ROLES.MODERATOR
        if (oldModIndex > -1) {
          rooms[roomIndex].players[oldModIndex].role = null
        }
        noticeRoomChange(roomId)
      }
    }
  })

  socket.on('start-game', (roomId) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    if (roomIndex > -1 && !rooms[roomIndex].isPlaying) {
      rooms[roomIndex].isPlaying = true
      const randomRoles = getRandomRole(rooms[roomIndex].players.length - 1)
      const assignedPlayers = rooms[roomIndex].players
        .filter((p) => p.role !== ROLES.MODERATOR)
        .map((player, index) => {
          player.role = randomRoles[index]
          return player
        })
      const moderator = rooms[roomIndex].players.find(
        (p) => p.role === ROLES.MODERATOR
      )
      if (moderator) {
        assignedPlayers.push(moderator)
      }
      rooms[roomIndex].players = assignedPlayers
      noticeRoomChange(roomId)
    }
  })
  socket.on('end-game', (roomId) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    if (roomIndex > -1 && rooms[roomIndex].isPlaying) {
      rooms[roomIndex].isPlaying = false
      rooms[roomIndex].players = rooms[roomIndex].players.map((player) => {
        player.role = null
        return player
      })
      noticeRoomChange(roomId)
    }
  })

  socket.on('request-my-role', ({ roomId, playerId }) => {
    const roomIndex = rooms.findIndex((room) => room.id === roomId)
    if (roomIndex > -1) {
      const playerIndex = rooms[roomIndex].players.findIndex(
        (p) => p.id === playerId
      )
      if (playerIndex > -1) {
        socket.emit('room-player', rooms[roomIndex].players[playerIndex])
      }
    }
  })
})

server.listen(3000, '0.0.0.0', () => {
  console.log('Server listening on port 3000')
})
