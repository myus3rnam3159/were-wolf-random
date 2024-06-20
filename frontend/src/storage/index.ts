import { STORAGE } from '../commons/constants'

export const saveToLocalStorage = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

export const savePlayer = (name: string) => {
  saveToLocalStorage(STORAGE.PLAYER, { id: name, name })
}

export const getPlayer = () => {
  return getFromLocalStorage(STORAGE.PLAYER)
}
