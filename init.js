const { REST, Events } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./auth.json')

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
  // REACT to a message
  if (message.content.indexOf('cumbus') >= 0) {
    const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'cumbus');
    message.react(reactionEmoji)
  }

  // mention everyone attending an event in a new message
  if (message.content.indexOf('send reminder') >= 0) {
    const scheduledEvent = message.guild.scheduledEvents.cache.find(event => event.name === 'writing sick code bro')
    const subscribers = await scheduledEvent.fetchSubscribers()
    subscribers.forEach(scriber => {
      const reminderChannel = client.channels.cache.find(channel => channel.name === 'reminders')
      reminderChannel.send(`hey <@${scriber.user.id}> don't forget about the event`)
    })
  }

  // move a text channel to inactive
  if (message.content.indexOf('clean') >= 0) {
    const channelToMove = message.guild.channels.cache.find(c => c.name === 'offseason')
    const channelMessages = await channelToMove.messages.fetch({limit: 1})
    const lastMessage = channelMessages.first()

    if (Date.now() - lastMessage.createdTimestamp > 2592000000) { // number of milliseconds in 30 days 
      channelToMove.setParent(inactiveCategory)
    }
  }
})

client.login(token);


/*

get all members of a role

  const hackerRole = message.guild.roles.cache.find(role => role.name === 'Elite Hackers')
  const hackerMembers = hackerRole.members.map(z => z.user.tag)
  hackerMembers.forEach(z => console.log(z))

  */


/*

view all roles of user

console.log(message.member.roles.cache)
console.log('does the sender have a role?')

if(message.member.roles.cache.size >= 2) { // 2 because @everyone is a default role that everyone has
  console.log('yes')
} else {
  console.log('no')
}

*/