const RACE_STATUS = {
  INITIATED: 'INITIATED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETE: 'COMPLETE',
}

const initiateRace = async (client) => {
  await writeRaceStatusToDiscord(client, RACE_STATUS.INITIATED)
  await initializePlayerInterface(client)
}

const addRacer = async (client, user) => {
  console.log('in add racer')
  const raceChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const raceChannelMessages = await raceChannel.messages.fetch()
  let addRacerMessage
  raceChannelMessages.forEach(message => {
    if (message.content.includes(`Id:${user.id}`)) {
      addRacerMessage = message
      raceChannel.send(`User ${user.username} already exists in race`)
    }
  })

  console.log(`addRacerMessage is: ${addRacerMessage}`)
  if (!addRacerMessage) {
    const addRacerMessage = await raceChannel.send(`Id:${user.id}::Username:${user.username}::Deaths:0::Badges:0`)
  }
}

const removeRacer = async (client, user) => {
  const raceChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const raceChannelMessages = await raceChannel.messages.fetch()
  raceChannelMessages.forEach(async message => {
    if (message.content.includes(`Id:${user.id}`)) {
      await message.delete()
      console.log(`User ${user.username} deleted from race`)
    }
  })
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

const initializePlayerInterface = async (client) => {
  //TODO!!!! Change this to point to the pokemon race channel
  const raceChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const joinEmoji = raceChannel.guild.emojis.cache.find(emoji => emoji.name === 'nrPokeball')
  const leaveEmoji = raceChannel.guild.emojis.cache.find(emoji => emoji.name === 'nrDisgust')
  if (!joinEmoji || !leaveEmoji) {
    console.log('could not find one of the emoji, exiting')
    return
  }

  const playerInterfaceMessage = await raceChannel.send(
    `**PLAYER INTERFACE**
React with ${joinEmoji} to join the race.
React with ${leaveEmoji} to leave the race.`)
  await playerInterfaceMessage.react(joinEmoji)
  await playerInterfaceMessage.react(leaveEmoji)

  client.on('messageReactionAdd', async (reaction, user) => {
    if (user.username.includes('No Respect Bot')) return
    if (reaction.message.id === playerInterfaceMessage.id) {
      if (reaction._emoji.name === 'nrPokeball') {
        await addRacer(client, user)
        await reaction.users.remove(user.id)
      }
      if (reaction._emoji.name === 'nrDisgust') {
        console.log(`User ${user.username} id ${user.id} left the race`)
        await removeRacer(client, user)
        await reaction.users.remove(user.id)
      }
    }
  })
}

const writeRaceStatusToDiscord = async (client, status) => {
  const backupChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!backupChannel) {
    console.log('backup channel not found, very yikes, everything is broken')
    return
  }

  const messages = await backupChannel.messages.fetch()

  // i can't figure out how to use .find() on the object returned by messages.fetch(), rip
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

