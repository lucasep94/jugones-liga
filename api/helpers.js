const getPlayer = (playerId, teams) =>  {
  var player
  var team = teams.find(t => {
    player = t.players.find(p => p.id === playerId)
    return player
  })

  if (player && team) {
    return { player, teamId: team.id }
  }

  return false
}

module.exports = {
  getPlayer
}
