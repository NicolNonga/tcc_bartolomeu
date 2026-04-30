import server from '@adonisjs/core/services/server'
import { Server } from 'socket.io'

const io = new Server(server.getNodeServer(), {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

export { io }
