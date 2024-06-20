import { Role } from '../commons/constants'

export interface IPlayer {
  id: string
  name: string
  role?: Role
}

export interface IRoom {
  id: string
  name: string
  players?: IPlayer[]
  isPlaying?: boolean
}
