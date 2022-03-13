module.exports = {
  moveChannelsToInactive: async (guild) => {
    const inactiveCategoryName = 'less active text channels'
    const inactiveCategory = guild.channels.cache.find(
      (channel) => channel.name.toLocaleLowercase() === inactiveCategoryName
    )
    if (!inactiveCategory) return

    guild.channels.cache.forEach((channel) => {
      const channelMessages = await channel.messages.fetch({ limit: 1 })
      const lastMessage = channelMessages.first()

      if (Date.now() - lastMessage.createdTimestamp > 2592000000) {
        // number of milliseconds in 30 days
        channelToMove.setParent(inactiveCategory)
      }
    })
  },
}
