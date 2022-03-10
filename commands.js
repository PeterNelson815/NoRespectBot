module.exports = {
  handleCommand: async interaction => {
    if (!interaction.isCommand)
      return;

    if (interaction.commandName === 'flipacoin') {
      const message = Math.random() > .4 ? 'HEADS' : 'TAILS';
      await interaction.reply(message);
    }

    if (interaction.commandName === 'chuck') {
      await interaction.channel.send({
        files: [
          './images/chuck.png'
        ]
      });
    }
  }
}