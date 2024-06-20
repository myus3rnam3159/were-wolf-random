import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Button, Tag, Popconfirm, Modal } from 'antd'
import { UserOutlined, ProfileOutlined } from '@ant-design/icons'

import { IPlayer, IRoom } from '../types'
import socket from '../services/socket'
import { getPlayer } from '../storage'
import { Role } from '../commons/constants'

const PlayBoard = () => {
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const { id } = useParams()

  const [players, setPlayers] = useState<IPlayer[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>()

  useEffect(() => {
    const player = getPlayer()
    if (player) {
      setCurrentPlayer(player)
    }
    socket.emit('join-room', {
      roomId: id,
      player: {
        id: player?.id,
        name: player?.name,
        role: null
      }
    })
    socket.on('room-change', (data: IRoom) => {
      if (data.isPlaying) {
        navigate(`/room/${id}/play`)
      }
      setPlayers(data.players || [])
    })

    return () => {
      socket.off('room-change')
    }
  }, [id, navigate])

  const renderPlayer = (player: IPlayer) => {
    return (
      <div key={player.id} className="w-1/2">
        <div className="border mx-2 mb-4 rounded pl-3 pt-2 pb-3">
          <Tag icon={<UserOutlined />} color="orange">
            {player.name}
          </Tag>
          <Tag color="default">Đang chờ</Tag>
        </div>
      </div>
    )
  }

  const changeToModerator = () => {
    const player = getPlayer()
    socket.emit('change-to-moderator', {
      roomId: id,
      player: {
        id: player?.id,
        name: player?.name,
        role: null
      }
    })
  }

  const startBoard = async () => {
    const confirmed = await modal.confirm({
      title: 'Xác nhận bắt đầu chơi',
      content: 'Game sẽ bắt đầu sau 3 giây',
      centered: true
    })
    if (confirmed) {
      socket.emit('start-game', id)
    }
  }

  const moderator = players.find((p) => p.role === Role.MODERATOR)

  return (
    <div>
      <Divider orientation="left">
        <span className="font-bold text-l text-orange-500">Người quản trò</span>
      </Divider>
      <div className="w-1/2">
        {moderator?.id && (
          <div className="border mx-2 mb-4 rounded pl-3 py-2">
            <Tag icon={<ProfileOutlined />} color="cyan">
              {moderator.name}
            </Tag>
            <Tag color="green">Quản trò</Tag>
          </div>
        )}
      </div>
      <Popconfirm
        placement="bottom"
        title="Chắc chưa :v"
        description="Chắc rồi thì nhấn Ok"
        okText="Ok"
        cancelText="Huỷ"
        onConfirm={changeToModerator}
      >
        <Button className="left-4 right-4" type="primary">
          Xung phong làm quản trò
        </Button>
      </Popconfirm>

      <Divider orientation="left">
        <span className="font-bold text-l text-orange-500">
          Danh sách người chơi
        </span>
      </Divider>
      <div className="flex flex-row flex-wrap">
        {players.filter((p) => p.role !== Role.MODERATOR).map(renderPlayer)}
      </div>
      {moderator?.id === currentPlayer?.id && (
        <Button
          className="absolute bottom-4 left-4 right-4"
          type="primary"
          size="large"
          onClick={startBoard}
        >
          Bắt đầu chơi
        </Button>
      )}
      {contextHolder}
    </div>
  )
}

export default PlayBoard
