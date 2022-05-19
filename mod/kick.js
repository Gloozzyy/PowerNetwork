const {
  Client,
  Collection,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  Intents
} = require('discord.js');
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
if (!message.member.hasPermission('KICK_MEMBERS')) {
      const noKickPermsEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle('Kick')
        .setDescription("Insufficient permissions (Requires permission `Kick_Members`)")
        .setFooter(`Command executed by ${message.author.tag}`, message.author.displayAvatarURL())
      return message.channel.send(noKickPermsEmbed).then(msg => {
        msg.delete({ timeout: 30000 })
      })
    }
    const member = message.mentions.members.first();
    if (!member) {
      const userNotMentionedEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle('Kick')
        .setDescription("```You have not mentioned a user```")
        .setFooter(`Command executed by ${message.author.tag}` + message.author.displayAvatarURL())
      return message.channel.send(userNotMentionedEmbed).then(msg => {
        msg.delete({ timeout: 30000 })
      })
    }
    if (!member.kickable) {
      const userUnKickableEmbed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setTitle('Kick')
        .setDescription("```" + member.user.tag + " is unkickable```")
        .setFooter(`Command executed by ${message.author.tag}` + message.author.displayAvatarURL())
      return message.channel.send(userUnKickableEmbed).then(msg => {
        msg.delete({ timeout: 30000 })
      })
    }
    const reason = args.slice(1).join(" ")
    if (member) {
      if (!reason) return member.kick().then(member => {
        const userKickedNoReasonEmbed = new Discord.MessageEmbed()
          .setColor(config.color)
          .setTitle('Kick')
          .setDescription("```" + member.user.tag + " was kicked, no reason was provided```")
          .setFooter(`Command executed by ${message.author.tag} ` + message.author.displayAvatarURL())
        message.channel.send(userKickedNoReasonEmbed);
      })

      if (reason) return member.kick(reason).then(member => {
        const userKickedWithReasonEmbed = new Discord.MessageEmbed()
          .setColor(config.color)
          .setTitle('Kick')
          .setDescription("```" + member.user.tag + " was kicked for: " + reason + "```")
          .setFooter(`Command executed by ${message.author.tag}` + message.author.displayAvatarURL())
        message.channel.send(userKickedWithReasonEmbed);
      })
    }
}
module.exports.help = {
  name: "kick",
  aliases: []
}