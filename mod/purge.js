const {
  Client,
  Collection,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  Intents
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("../config.json");
module.exports.run = async (client, message, args) => {

  const purgeembed = new MessageEmbed()
  .setTitle("Monkey Purge")
  .setColor(config.color)
  .setDescription("> `Deleted " + args[0] + " message.`")
  .setTimestamp()
  .setThumbnail(config.logo)
  .setFooter(`Command executed by: ${message.author.tag}`, message.author.displayAvatarURL())

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Insufficient permissions (Requires permission `Manage_Messages`)");
  if (!args[0])
    return message.channel.send("Please specify a number between 1 - 99 to purge.");
  if (isNaN(args[0])) return message.channel.send("Please enter a valid number!");
  if (parseInt(args[0]) > 99) return message.channel.send("You gave a number over the limit!");
  await message.channel
    .bulkDelete(parseInt(args[0]) + 1)
    .catch((err) => console.log(err));
  message.channel.send(purgeembed);
}

module.exports.help = {
  name: "purge",
  aliases: []
}