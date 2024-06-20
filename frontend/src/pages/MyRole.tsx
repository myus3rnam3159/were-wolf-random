import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { IPlayer } from '../types'
import socket from '../services/socket'
import { getPlayer } from '../storage'
import { ROLE_MAPPING } from '../commons/constants'

const getRole = (roleId: string) => {
  return ROLE_MAPPING.find((r) => r.id === roleId)
}

const MyRole = () => {
  const { id } = useParams()
  const [countDown, setCountDown] = useState(3)
  const [player, setPlayer] = useState<IPlayer>()

  const renderCountDown = () => {
    return (
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-orange-300 flex flex-col flex-wrap content-center justify-center">
        <span className="text-8xl font-black flex flex-wrap justify-center">
          {countDown}
        </span>
        <span className="mt-4 text-l">Đang vào game...</span>
      </div>
    )
  }

  const renderRole = () => {
    const role = getRole(player?.role ?? '')
    return (
      <div className="h-full w-full flex flex-wrap content-center justify-center bg-gradient-to-r from-blue-200 to-cyan-200">
        <div className="border rounded bg-gradient-to-r from-blue-300 to-cyan-300">
          <p className="text-2xl font-bold w-full text-center py-4">
            {role?.name}
          </p>
          <div className="flex content-center justify-center text-center">
            <img
              className="rounded"
              src="https://mega.com.vn/media/news/2806_ma-soi-online3.JPG"
              alt="soi"
              width={200}
              height={200}
            />
          </div>
          <p className="p-4 text-center">{role?.description}</p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    const player = getPlayer()
    socket.emit('request-my-role', { roomId: id, playerId: player?.id })
    socket.on('room-player', (data: IPlayer) => {
      setPlayer(data)
    })

    const countDownInterval = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown > 1) {
          return prevCountDown - 1
        }
        clearInterval(countDownInterval)
        return 0
      })
    }, 1000)

    return () => {
      clearInterval(countDownInterval)
      socket.off('room-player')
    }
  }, [id])

  return <div>{countDown ? renderCountDown() : renderRole()}</div>
}

export default MyRole
