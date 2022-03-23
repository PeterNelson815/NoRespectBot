const RACE_STATUS = {
  INITIATED: 'INITIATED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
}

const initiateRace = async (client) => {
  await writeRaceStatusToDiscord(client, RACE_STATUS.INITIATED)
}

const addRacer = async member => {

  await writeDataBackupToDiscord(client)
}

const removeRacer = async member => {

  await writeDataBackupToDiscord(client)
}

const startRace = async (client) => {
  await writeRaceStatusToDiscord(client, RACE_STATUS.IN_PROGRESS)
}

const addDeath = async member => {

  await writeDataBackupToDiscord(client)
}

const addBadge = async member => {

  await writeDataBackupToDiscord(client)
}

const getLeaderboard = async () => {

}

const finishRace = async (client) => {
  await writeRaceStatusToDiscord(client, RACE_STATUS.COMPLETE)
}

const writeRaceStatusToDiscord = async (client, status) => {
  const backupChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!backupChannel) {
    console.log('backup channel not found, very yikes, everything is broken')
    return
  }

  const messages = await backupChannel.messages.fetch()
  let statusMessage 
  messages.forEach(message => {
    if (message.content.includes('RACE_STATUS')) statusMessage = message
  })
  if (!statusMessage) {
    // status message doesn't exist yet, initiate it
    backupChannel.send(`RACE_STATUS: ${status}`)
  } else {
    // edit the message in place
    statusMessage.edit(`RACE_STATUS: ${status}`)
  }
}

const importDataBackupFromDiscord = async (client) => {
  const backupChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  const messages = await backupChannel.fetch()
  console.log(`most recent message from backup channel: ${messages}`)

}

module.exports = {
  initiateRace,
  startRace,
  finishRace,
  getLeaderboard,
}

