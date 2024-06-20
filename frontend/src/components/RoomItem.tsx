import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'

import { IRoom } from '../types'

const RoomItem = (props: IRoom, index: number) => {
  const navigate = useNavigate()

  const navigateToRoom = () => {
    navigate(`/room/${props.id}`)
  }

  return (
    <>
      {index !== 0 && <div className="h-px w-full bg-slate-100" />}
      <div
        key={props.id}
        className="p-8 hover:cursor-pointer hover:bg-sky-200"
        onClick={navigateToRoom}
      >
        <div className="flex flex-row justify-between">
          <span className="text-black font-bold">{props.name}</span>{' '}
          {props.isPlaying && (
            <Tag className="ml-2" color="green">
              Đang diễn ra
            </Tag>
          )}
        </div>
        <p>Số người tham gia: {props.players?.length ?? 0}</p>
      </div>
    </>
  )
}

export default RoomItem
