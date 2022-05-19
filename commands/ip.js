const { Client, Collection, MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Message, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
  const ipEmbed = new MessageEmbed()
    .setAuthor({ name: "PowerNetwork IP", url: config.logo })
    .setDescription("```PowerNetwork.minehut.gg```");
    .setColor(config.color)
    .setThumbnail(config.logo)
    .setFooter({ text: config.footer })

}

module.exports.help = {
  name: "ip",
  aliases: []
}
