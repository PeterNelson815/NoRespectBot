const { initiateRace, startRace, finishRace } = require('./pokemon.js')

const handlePokemonCommand = async (messageArgs, message, client) => {
  if (!message.member.user.username.toLocaleLowerCase().includes('peter')) {
    console.log('someone other than me tried to command')
    return
  }

  if (messageArgs[1] === 'initiate') {
    await initiateRace(client)
  }
  if (messageArgs[1] === 'join') {

  }
  if (messageArgs[1] === 'leave') {

  }
  if (messageArgs[1] === 'start') {
    await startRace(client)

  }
  if (messageArgs[1] === 'death' || messageArgs[1] === 'wipe') {

  }
  if (messageArgs[1] === 'badge') {

  }
  if (messageArgs[1] === 'finish') {
    await finishRace(client)
  }
}

module.exports = {
  handleCommands: async (message, client) => {
    //todo add help / descriptions for all of these and better error handling/edge cases
    if (message.content[0] !== '=') return
    const messageArgs = message.content.toLocaleLowerCase().slice(1).split(' ')

    if (messageArgs[0] === 'flipacoin') {
      const response = Math.random() >= 0.5 ? 'HEADS' : 'TAILS'
      await message.reply(response)
    }

    if (messageArgs[0] === 'random') {
      const choice = Math.floor(Math.random() * (messageArgs.length - 1)) + 1
      console.log(choice)
      await message.reply(messageArgs[choice])
    }

    if (messageArgs[0] === 'pokemon' || messageArgs[0] === 'pkmn') {
      await handlePokemonCommand(messageArgs, message, client)
    }
  },
}
