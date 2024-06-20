const { ROLES } = require('./constants')

const getRandomRole = (playerCount) => {
  const roles = [ROLES.WEREWOLF, ROLES.GUARD, ROLES.SEER]
  if (playerCount < 9) {
    roles.push(ROLES.WEREWOLF)
  } else if (playerCount <= 12) {
    roles.concat([ROLES.WEREWOLF, ROLES.WEREWOLF, ROLES.WITCH])
  } else {
    // TODO: add more role if players > 12
    roles.concat([ROLES.WEREWOLF, ROLES.WEREWOLF, ROLES.WITCH])
  }

  if (roles.length < playerCount) {
    roles.push(...Array(playerCount - roles.length).fill(ROLES.VILLAGER))
  }
  roles.sort(() => Math.random() - 0.5)
  return roles
}

module.exports = {
  getRandomRole
}
