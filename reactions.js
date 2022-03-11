module.exports = {
  handleReactions: message => {
    if (message.content.toLocaleLowerCase().includes('cumbus')) {
      const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name.toLocaleLowerCase() === 'nrcumbus');
      if (!reactionEmoji) {
        console.log('no cumbus emoji')
        return;
      }
      message.react(reactionEmoji)
    }
  }
}