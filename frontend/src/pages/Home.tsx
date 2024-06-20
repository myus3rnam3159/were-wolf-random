import { useEffect, useState } from 'react'
import { Divider, Input, List, Modal } from 'antd'

import { IRoom } from '../types'

import RoomItem from '../components/RoomItem'
import socket from '../services/socket'
import { getPlayer, savePlayer } from '../storage'

const Home = () => {
  const [rooms, setRooms] = useState<IRoom[]>([
    {
      id: 'strawberry',
      name: 'Phòng C',
      players: [],
      isPlaying: false
    },
    { id: 'orange', name: 'Phòng A', players: [], isPlaying: false },
    { id: 'apple', name: 'Phòng B', players: [], isPlaying: false },
    { id: 'think', name: 'Phòng Main', players: [], isPlaying: false }
  ])
  const [player, setPlayer] = useState({
    id: '',
    name: ''
  })

  useEffect(() => {
    const player = getPlayer()
    setPlayer(player)

    socket.emit('request-room-list')
    socket.on('room-list', (data: IRoom[]) => {
      setRooms(data)
    })

    return () => {
      socket.off('room-list')
    }
  }, [])

  const handleSavePlayer = () => {
    if (player.name) {
      savePlayer(player.name)
      setTimeout(() => {
        const player = getPlayer()
        if (player?.id) {
          setPlayer(player)
        }
      }, 100)
    }
  }

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayer({
      id: '',
      name: e.target.value
    })
  }

  return (
    <div className="p-4">
      <Divider orientation="left">
        <span className="font-bold text-xl text-orange-500">Ma sói</span>
      </Divider>
      <List
        className="bg-white"
        size="large"
        header={
          <div className="font-bold text-orange-500">Danh sách phòng</div>
        }
        dataSource={rooms}
        renderItem={RoomItem}
        bordered
      />
      <Modal
        title="Nhập thông tin người chơi"
        open={!player?.id}
        onOk={handleSavePlayer}
      >
        <Input
          placeholder="Nhập tên (dưới 10 ký tự để dễ đọc)"
          onChange={onChangeName}
        />
      </Modal>
    </div>
  )
}

export default Home
