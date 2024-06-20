export const STORAGE = {
  ROOM_LIST: 'room_list',
  CURRENT_ROOM: 'current_room',
  PLAYER: 'player'
}

export const ROLE_MAPPING = [
  {
    id: 'MODERATOR',
    name: 'Quản trò',
    description: 'Hướng dẫn trò chơi'
  },
  {
    id: 'VILLAGER',
    name: 'Dân làng',
    description: 'Không có chức năng (hãy dẫn dắt làng để chiến thắng)'
  },
  {
    id: 'WEREWOLF',
    name: 'Ma sói',
    description: 'Mỗi đêm sẽ thức dậy cùng nhau để chọn 1 người để giết'
  },
  {
    id: 'SEER',
    name: 'Tiên tri',
    description:
      'Ban đêm được chọn một người để soi và biết người đó thuộc phe dân hoặc sói'
  },
  {
    id: 'WITCH',
    name: 'Phù thuỷ',
    description:
      'Sở hữu 1 lọ thuốc cứu người và 1 lọ thuốc độc được dùng duy nhất một lần. Ban đêm sẽ được quản trò gọi dậy và cho biết ai là người vừa bị Ma Sói cắn, Phù Thủy có quyền dùng lọ thuốc để cứu người đó hoặc có thể dùng thuốc độc để giết một người bất kỳ, không thể sử dụng cả 2 lọ thuốc trong một đêm. Phù Thủy sẽ ko biết ai bị sói cắn trong đêm khi đã dùng hết thuốc cứu'
  },
  {
    id: 'GUARD',
    name: 'Bảo vệ',
    description:
      'Được quản trò gọi dậy vào mỗi đêm để bảo vệ một người bất kỳ (kể cả bản thân) có thể sống tiếp nếu bị Ma Sói cắn vào đêm đó, tuy nhiên nếu bị Phù Thủy đầu độc thì vẫn sẽ chết. Bảo Vệ không được chọn cứu cùng một người trong 2 đêm liên tiếp'
  }
]

export enum Role {
  MODERATOR = 'MODERATOR',
  VILLAGER = 'VILLAGER',
  WEREWOLF = 'WEREWOLF',
  SEER = 'SEER',
  WITCH = 'WITCH',
  GUARD = 'GUARD'
}
