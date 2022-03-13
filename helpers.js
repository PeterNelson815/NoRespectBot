module.exports = {
  getAllMembersByRole: (guild, roleName) => {
    const members = guild.roles.cache.find((role) => role.name === roleName)
    return members
  },

  viewAllRolesOfUserByMessage: (message) => {
    return message.member.roles.cache
  },
}
