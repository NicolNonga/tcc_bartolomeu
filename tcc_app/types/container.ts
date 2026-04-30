// types/container.ts
import { Server } from 'socket.io'

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    'socket.io': Server
  }
}
