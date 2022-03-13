module.exports = {
  mentionEveryoneByEventName: async (guild, eventName) => {
    const scheduledEvent = guild.scheduledEvents.cache.find(
      (event) => event.name === eventName
    )
    if (!scheduledEvent) return

    const subscribers = await scheduledEvent.fetchSubscribers()
    subscribers.forEach((scriber) => {
      const reminderChannel = guild.channels.cache.find(
        (channel) => channel.name === 'norespect'
      )
      reminderChannel.send(
        `Hey <@${scriber.user.id}> don't forget about that event`
      )
    })
  },
}
