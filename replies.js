const replies = [
  'sometimes it do be like that',
  'same tbh',
  'i was literally just about to type this myself',
  'preach',
  'All good.',
  `i'd like to see someone even TRY to debate this`,
  'do you have a source for that?'
]


const chooseRandomReply = () => {
  const replyIndex = Math.floor(Math.random() * replies.length)
  return replies[replyIndex]
}

module.exports = {
  handleReplies: (message) => {
    if (message.member.displayName === 'MathBot') {
      if (
        message.content
          .toLocaleLowerCase()
          .includes('maybe your query was malformed')
      ) {
        message.reply('mathbot more like trashbot lmao')
      } /*else if (Math.random() > 0.5) {
        message.reply(
          `Do you have a source for that? Because I'm fairly certain that is NOT correct.`
        ) <<<< this is good but mathbot splits its replies into multiple messages sometimes, need to only respond to one before re-enabling this
      }*/
      return
    }

    const shouldIssueRandomReply = (Math.random() > 0.999) ||
      (new Date().getDay() === 5 && Math.random() > 0.995) // on fridays we party
    if (shouldIssueRandomReply) {
      message.reply(chooseRandomReply())
    }

    if (message.mentions.users.some(user => user.username === 'No Respect Bot')) {
      if (message.content.toLocaleLowerCase().includes('bad') ||
        message.content.toLocaleLowerCase().includes('shame on you')) {
          message.reply('All good.')
        }
    }
  }
}
