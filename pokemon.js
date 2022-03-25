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
  const raceDataChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceDataChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const raceDataChannelMessages = await raceDataChannel.messages.fetch()
  const shouldAddRacer = true
  raceDataChannelMessages.forEach(message => {
    if (message.content.includes(`Id:${user.id}`)) {
      shouldAddRacer = false
      raceDataChannel.send(`User ${user.username} already exists in race`)
    }
  })

  if (shouldAddRacer) {
    const addRacerMessage = await raceDataChannel.send(`Id:${user.id}::Username:${user.username}::Deaths:0::Badges:0`)
  }
}

const removeRacer = async (client, user) => {
  const raceDataChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceDataChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const raceDataChannelMessages = await raceDataChannel.messages.fetch()
  raceDataChannelMessages.forEach(async message => {
    if (message.content.includes(`Id:${user.id}`)) {
      await message.delete()
      console.log(`User ${user.username} deleted from race`)
    }
  })
}

const startRace = async (client) => {
  await writeRaceStatusToDiscord(client, RACE_STATUS.IN_PROGRESS)
  await updateLeaderboard(client)
}

const addDeath = async member => {

  await writeDataBackupToDiscord(client)
}

const addBadge = async member => {

  await writeDataBackupToDiscord(client)
}

const updateLeaderboard = async (client) => {
  const raceDataChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceDataChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const raceDataChannelMessages = await raceDataChannel.messages.fetch()
  const racerData = []
  raceDataChannelMessages.forEach(message => {
    if (message.content.includes(`Id:`)) {
      racerData.push(parseRacerData(message.content))
    }
  })
  console.log(`Racer Data: ${racerData}`)
  const leaderboardMessageContent = formatRacerData(racerData)

  const botTestingChannel = client.channels.cache.find(channel => channel.name === 'bot-testing')
  const botTestingMessages = botTestingChannel.messages.fetch()

  let leaderboardMessage
  botTestingMessages.forEach(message => {
    if (message.content.includes('Leaderboard')) leaderboardMessage = message
  })

  if (!leaderboardMessage) {
    botTestingChannel.send(leaderboardMessageContent)
  } else {
    leaderboardMessage.edit(leaderboardMessageContent)
  }
}

const parseRacerData = messageContent => {
  const args = messageContent.split('::')
  return {
    username: args[1].split(':')[1],
    deaths: args[2].split(':')[1],
    badges: args[3].split(':')[1],
  }
}

const formatRacerData = racerData => {
  racerData.sort((a,b) => a.deaths - b.deaths)
  return `**LEADERBOARD**
  `
}

const finishRace = async (client) => {
  await writeRaceStatusToDiscord(client, RACE_STATUS.COMPLETE)
}

const initializePlayerInterface = async (client) => {
  //TODO!!!! Change this to point to the pokemon race channel
  const raceDataChannel = client.channels.cache.find(channel => channel.name === 'pokemon-race-data')
  if (!raceDataChannel) {
    console.log('race channel not found, very yikes, everything is broken')
    return
  }

  const joinEmoji = raceDataChannel.guild.emojis.cache.find(emoji => emoji.name === 'nrPokeball')
  const leaveEmoji = raceDataChannel.guild.emojis.cache.find(emoji => emoji.name === 'nrDisgust')
  if (!joinEmoji || !leaveEmoji) {
    console.log('could not find one of the emoji, exiting')
    return
  }

  const playerInterfaceMessage = await raceDataChannel.send(
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
}

