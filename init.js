const { Client, Intents } = require('discord.js')

const { createToken } = require('./auth.js')
const { handleReactions } = require('./reactions.js')
const { handleReplies } = require('./replies.js')
const { handleCommands } = require('./commands.js')

const EventLogger = require('node-windows').EventLogger
const log = new EventLogger('NoRespectBot')

//start the webserver
require('./webserver.js')

//start the discord bot
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: [
    'USER', 'MESSAGE', 'CHANNEL', 'REACTION'
  ]
})

client.on('ready', () => {
  log.info(`Logged in as ${client.user.tag}!`)
})

client.on('threadCreate', async (thread) => {
  if (thread.joinable) {
    await thread.join()
    if (thread.joined) {
      thread.send('First')
    }
  }
})

client.on('messageCreate', async (message) => {
  if (message.content[0] === '=') {
    handleCommands(message, client)
    // don't need to handle reactions/replies for bot commands
    return
  }
  // every message on the server will pass through handleReactions and handleReplies
  handleReactions(message)
  handleReplies(message)
})

client.login(createToken())
