module.exports = {
  handleReactions: message => {
    const reactionEmojis = getReactionEmojiList(message)
    reactionEmojis.forEach(reaction => {
      message.react(message.guild.emojis.cache.find(emoji => emoji.name.toLocaleLowerCase() === reaction))
    })
  }
}

const getReactionEmojiList = message => {
  let reactionEmojis = [];
  if (message.content.toLocaleLowerCase().includes('cumbus') ||
      message.content.toLocaleLowerCase().includes('shortz')) reactionEmojis.push('nrcumbus')
  if (message.content.toLocaleLowerCase().match(/\b(ben)\b/) ||
      message.content.toLocaleLowerCase().includes('good boy')) reactionEmojis.push('nrben')
  if (message.content.toLocaleLowerCase().match(/\b(gretch)\b/) ||
      message.content.toLocaleLowerCase().match(/\b(gretchen)\b/) ||
      message.content.toLocaleLowerCase().includes('good girl')) reactionEmojis.push('nrgretchen')
  if (message.content.toLocaleLowerCase().includes('friday')) {
    reactionEmojis.push('nrfriday')
    reactionEmojis.push('nrfridaynight')
    reactionEmojis.push('nrfridaynight2')
  }
  if (message.content.toLocaleLowerCase().includes('blizzard')) reactionEmojis.push('nreww')
  if (message.member.user.username.toLocaleLowerCase().includes('wentza') && message.content.split(' ').length >= 20) reactionEmojis.push('nryikes')

  return reactionEmojis
}