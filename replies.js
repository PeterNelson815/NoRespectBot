module.exports = {
  handleReplies: message => {
    if (message.content.toLocaleLowerCase().includes('maybe your query was malformed') && 
        message.member.displayName === 'MathBot') {
      message.reply('mathbot more like trashbot lmao')
    }
    if (Math.random() > 0.99) {
      message.replay('same tbh')
    }
  }
}