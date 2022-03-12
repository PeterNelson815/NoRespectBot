module.exports = {
  handleReactions: message => {
    const reactionEmojis = getReactionEmojiList(message)
    // add .slice(0,5) if we want to set a limit on how many emojis can be reacted per message
    reactionEmojis.forEach(reaction => {
      const emoji = message.guild.emojis.cache.find(emoji => emoji.name.toLocaleLowerCase() === reaction)
      if (emoji) message.react(emoji)
    })
  }
}

const getReactionEmojiList = message => {
  const messageLowerCase = message.content.toLocaleLowerCase()
  let reactionEmojis = [];
  if (messageLowerCase.includes('cumbus') ||
      messageLowerCase.includes('shortz') ||
      messageLowerCase.includes('crossword')) reactionEmojis.push('nrcumbus')
  if (messageLowerCase.match(/\b(ben)\b/) ||
      messageLowerCase.includes('good boy')) reactionEmojis.push('nrben')
  if (messageLowerCase.match(/\b(gretch)\b/) ||
      messageLowerCase.match(/\b(gretchen)\b/) ||
      messageLowerCase.includes('good girl')) reactionEmojis.push('nrgretchen')
  if (messageLowerCase.match(/\b(olive)\b/)) reactionEmojis.push('nrolive2')
  if (messageLowerCase.includes('friday')) {
    reactionEmojis.push('nrfriday')
    reactionEmojis.push('nrfridaynight')
    reactionEmojis.push('nrfridaynight2')
  }
  if (messageLowerCase.includes('blizzard')) reactionEmojis.push('nreww')
  if (message.member.user.username.toLocaleLowerCase().includes('wentza') && message.content.split(' ').length >= 20) {
    reactionEmojis.push('nryikes')
  }
  if (messageLowerCase.includes('kitsuragi')) reactionEmojis.push('nrkim')
  if (messageLowerCase.includes('expression')) reactionEmojis.push('nrdisco')
  if (messageLowerCase.includes('tenz')) reactionEmojis.push('nrtenz')
  if (messageLowerCase.includes('observ')) reactionEmojis.push('nrobserving2')
  if (messageLowerCase.includes('type matchup')) reactionEmojis.push('nrhop')
  if (messageLowerCase === 'yikes') reactionEmojis.push('nryikes')
  if (messageLowerCase.includes('pissed')) reactionEmojis.push('nrbobby')
  if (messageLowerCase === 'really?') reactionEmojis.push('nrshock')
  if (messageLowerCase.includes('the chiefs')) reactionEmojis.push('nrkelting')
  if (messageLowerCase.includes('headshot')) reactionEmojis.push('nrdoug')
  if (messageLowerCase.includes('are you serious')) reactionEmojis.push('nridontbelieveyou')
  if (messageLowerCase === 'what' || messageLowerCase === 'what?') reactionEmojis.push('nrwhat')




  return reactionEmojis
}