const { Client, Intents } = require('discord.js')

const { createToken } = require('./auth.js')
const { handleReactions } = require('./reactions.js')
const { handleReplies } = require('./replies.js')
const { handleCommands } = require('./commands.js')
const { getProperty, writeToStore } = require('./datastore.js')

//start the webserver
require('./webserver.js')

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
  await incrementMessageCounter()
  if (message.content[0] === '=') {
    handleCommands(message)
    // don't need to handle reactions/replies for bot commands
    return
  }
  // every message on the server will pass through handleReactions and handleReplies
  handleReactions(message)
  handleReplies(message)
})

client.login(createToken())

const incrementMessageCounter = async () => {
  let messageCount = await getProperty('messageCount')
  console.log('message count is', messageCount)
  if (!messageCount) messageCount = 0
  messageCount++
  await writeToStore('messageCount', messageCount)
}
