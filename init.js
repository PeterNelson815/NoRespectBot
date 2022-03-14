const { token } = require('./auth.json')
const { handleReactions } = require('./reactions.js')
const { handleReplies } = require('./replies.js')
const { handleCommands } = require('./commands.js')

const { Client, Intents } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) {
    const { handleCommands } = require('./commands.js')
    return handleCommands(interaction)
  }
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
    handleCommands(message)
    // don't need to handle reactions/replies for bot commands
    return
  }
  // every message on the server will pass through handleReactions and handleReplies
  handleReactions(message)
  handleReplies(message)
})

client.login(token)
