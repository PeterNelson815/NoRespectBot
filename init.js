const { REST, Events } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./auth.json')
const { handleReactions } = require('./reactions.js');
const { handleReplies } = require('./replies.js');

// invite link with bot/commands scopes, general permissions but nothing crazy (no admin, no server management stuff, just messages/emojis etc): https://discord.com/api/oauth2/authorize?client_id=951313574356221993&permissions=544390638656&scope=bot%20applications.commands

const commands = [{
  name: 'flipacoin',
  description: 'Returns HEADS or TAILS!'
}, {
  name: 'chuck',
  description: 'Returns an image of Chuck-E-Cheese'
}];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      // the following numbers are specific to our bot
      Routes.applicationGuildCommands('951313574356221993', '937849615049445496'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const { handleCommand } = require('./commands.js');
    return handleCommand(interaction);
  }

});

client.on('messageCreate', async message => {
  // every message on the server will pass through handleReactions and handleReplies
  handleReactions(message)
  handleReplies(message)
})

client.login(token);
