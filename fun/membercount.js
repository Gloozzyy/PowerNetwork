const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, Message, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
  
  const membercountembed = new MessageEmbed()
    .setTitle("Monkey Count")
    .setColor(config.color)
    .setDescription("```" + member.guild.memberCount + "```")
    .setThumbnail(config.logo)
    .setFooter(config.footer)

  if (!args.length) {
    return message.channel.send(membercountembed);
    //return message.channel.send({ embeds: [helpembed], components: [row] });
  }
}
//phone is so bad yea big bad
module.exports.help = {
  name: "membercount",
  aliases: []
}