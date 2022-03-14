module.exports = {
  handleCommands: async (message) => {
    if (message.content[0] !== '=') return
    const messageArgs = message.content.toLocaleLowerCase().slice(1).split(' ')

    if (messageArgs[0] === 'flipacoin') {
      const response = Math.random() >= 0.5 ? 'HEADS' : 'TAILS'
      await message.reply(response)
    }
  },
}
