const {
  Client,
  Collection,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  Intents
} = require('discord.js');
const fs = require("fs");
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('BAN_MEMBERS')) {
    const noBanPermsEmbed = new MessageEmbed()
      .setColor(config.color)
      .setTitle('Ban')
      .setDescription("Insufficient permissions (Requires permission `Ban_Members`)")
      .setFooter(`Command executed by ${message.author.tag}`, message.author.displayAvatarURL())
      message.delete();
    return message.channel.send(noBanPermsEmbed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
  }
  const member = message.mentions.members.first();
  if (!member) {
    const userNotMentionedEmbed2 = new MessageEmbed()
      .setColor(config.color)
      .setTitle('Ban')
      .setDescription("```You have not mentioned a user```")
      .setFooter(`Command executed by ${message.author.tag}`, message.author.displayAvatarURL())
      message.delete();
    return message.channel.send(userNotMentionedEmbed2).then(msg => {
      msg.delete({ timeout: 10000 })
    })
  }
  if (!member.bannable) {
    const userUnbannableEmbed = new MessageEmbed()
      .setColor(config.color)
      .setTitle('Ban')
      .setDescription("```" + member.user.tag + " is unbannable```")
      .setFooter(`Command executed by ${message.author.tag}`, message.author.displayAvatarURL())
      message.delete();
    return message.channel.send(userUnbannableEmbed).then(msg => {
      msg.delete({ timeout: 10000 })
    })
  }
  const reason = args.slice(1).join(" ")
  if (member) {
    if (!reason) return message.guild.members.cache.get(args[0]).ban().then(member => {
      const userKickedNoReasonEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle('Ban')
        .setDescription("```" + member.user.tag + " was banned, no reason was provided```")
        .setFooter(`Command executed by ${message.author.tag}`, message.author.displayAvatarURL())
        message.delete();
      message.channel.send(userKickedNoReasonEmbed);
    })

    if (reason) return message.guild.members.cache.get(args[0]).ban(reason).then(member => {
      const userBannedWithReasonEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle('Ban')
        .setDescription("```" + member.user.tag + " was banned for: " + reason + "```")
        .setFooter(`Command executed by ${message.author.tag}`, message.author.displayAvatarURL())
      message.channel.send(userBannedWithReasonEmbed);
      message.delete();
    })
  }
}

module.exports.help = {
  name: "ban",
  aliases: []
}