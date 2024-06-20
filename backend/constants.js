const ROLES = {
  MODERATOR: 'MODERATOR',
  VILLAGER: 'VILLAGER',
  WEREWOLF: 'WEREWOLF',
  SEER: 'SEER',
  WITCH: 'WITCH',
  GUARD: 'GUARD'
}

const DEFAULT_ROOMS = [
  { id: 'strawberry', name: 'Phòng A', players: [], isPlaying: false },
  { id: 'orange', name: 'Phòng B', players: [], isPlaying: false },
  { id: 'apple', name: 'Phòng C', players: [], isPlaying: false },
  { id: 'think', name: 'Phòng Main', players: [], isPlaying: false }
]

module.exports = {
  ROLES,
  DEFAULT_ROOMS
}
