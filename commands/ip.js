const { Client, Collection, MessageEmbed, MessageAttachment, MessageActionRow, MessageButton, Message, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
  
}

module.exports.help = {
  name: "ip",
  aliases: []
}
