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
    let msg = message.content.toLowerCase();

    const cantembed = new MessageEmbed()
    .setTitle("Monkey Nuke")
    .setColor(config.color)
    .setDescription("> `This channel has been nuked, Wait you cant.`")
    .setThumbnail("config.logo")
    .setImage("https://c.tenor.com/ErRi3m1RagAAAAAC/reverse-explosion.gif")
    .setTimestamp()
    .setFooter(`Command executed by: ${message.author.tag}`, message.author.displayAvatarURL())
    message.delete();

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(cantembed).then(msg => {
      msg.delete({ timeout: 10000 })
    });

    const nukeChannel = message.channel;

    const successembed = new MessageEmbed()
    .setTitle("Monkey Nuke")
    .setColor(config.color)
    .setDescription("> `This channel has been nuked.`")
    .setThumbnail(config.logo)
    .setImage("https://media1.tenor.com/images/2e50750a1356ee2cf828090cbb864634/tenor.gif?itemid=4464831")
    .setTimestamp()
    .setFooter(`Command executed by: ${message.author.tag}`, message.author.displayAvatarURL())

    if(!nukeChannel.deletable) return message.channel.send(successembed);

    await nukeChannel.clone({ position: nukeChannel.rawPosition }).then(ch => { ch.send(successembed);  })
    await nukeChannel.delete().catch(err => console.log(log));
}

module.exports.help = {
  name: "nuke",
  aliases: []
}