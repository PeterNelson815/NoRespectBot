module.exports = {
  handleReplies: (message) => {
    if (message.member.displayName === 'MathBot') {
      if (
        message.content
          .toLocaleLowerCase()
          .includes('maybe your query was malformed')
      ) {
        message.reply('mathbot more like trashbot lmao')
      } else if (Math.random() > 0.5) {
        message.reply(
          `Do you have a source for that? Because I'm fairly certain that is NOT correct.`
        )
      }
      return
    }
    if (Math.random() > 0.99) {
      message.reply('same tbh')
    }
  },
}
