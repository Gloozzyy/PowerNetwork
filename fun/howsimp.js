const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, Message, Intents } = require("discord.js");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});
const config = require("../config.json");
module.exports.run = async (client, message, args) => {
  
  let simprate = Math.floor(Math.random() * 101)
    let user = message.author;
    const taggedUser = message.mentions.users.first();
    if (taggedUser) {
      user = taggedUser;
    }
    let simprateEmbed = new Discord.MessageEmbed()
      .setTitle("Simp Machine")
      .setColor(config.color)
      .setDescription(`${user.username} is \`${simprate}%\` simp!`)
      .setFooter(message.client.user.username, message.client.user.avatarURL())
    //message.channel.send(simprateEmbed).catch(e => {

  if (!args.length) {
    return message.channel.send(simprateEmbed);
    //return message.channel.send({ embeds: [helpembed], components: [row] });
  }
}
  
module.exports.help = {
  name: "howsimp",
  aliases: []
}

// disable ( just for now )