module.exports = {
  handleReactions: message => {
    if (message.content.indexOf('cumbus') >= 0) {
      const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'cumbus');
      if (reactionEmoji) message.react(reactionEmoji)
    }
  }
}