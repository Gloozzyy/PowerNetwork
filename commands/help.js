const { Client, Collection, MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Message, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
  const helpembed = new MessageEmbed()
    .setAuthor({ name: "PowerNetwork Help Commands", url: config.logo })
    .addFields(
      { name: "Commands", value: "`>help commands`" },
      { name: "Fun", value: "`>mm!help fun`" },
      { name: "Search", value: "`>help search`" }
    )
    .setColor(config.color)
    .setThumbnail(config.logo)
    .setFooter({ text: config.footer })

  if (!args.length) {
    return message.channel.send({ embeds: [helpembed] });
  }
}

module.exports.help = {
  name: "help",
  aliases: []
}


