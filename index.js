const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, Message, Intents } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] });
const config = require('./config.json');
const fs = require('fs');
require('dotenv').config();

client.on('guildMemberAdd', async member => {
    const channellll = member.guild.channels.cache.get('972915287051620412');

    if (!channellll) return;
    const channelwelcomeEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle(`Welcome`)
        .setDescription(`${member.user.tag} joined the server`)
        .setFooter('#' + member.guild.memberCount)
        .setTimestamp()
    let welc = await channellll.send({ embeds: [channelwelcomeEmbed] }).then(message => {
        message.react("👋").catch()
    });
});
client.on('guildMemberRemove', async member => {
    const channellll = member.guild.channels.cache.get('972915287051620412');

    if (!channellll) return;

    const channelleaveEmbed = new MessageEmbed()
        .setColor(config.color)
        .setTitle('Goodbbe').setDescription(`${member.user.tag} left the server`)
        .setFooter('#' + member.guild.memberCount)
        .setTimestamp()
    channellll.send({ embeds: [channelwelcomeEmbed] }).then(message => {
        message.react("👋").catch()
    });
})


client.once('ready', () => {
    console.log('>———————— ⋄ Login ⋄ ————————<')
    console.log(`Logged into ${client.user.tag}`);
    client.user.setPresence({
        activities: [{
            name: `PowerNetwork.minehut.gg`,
            type: "PLAYING"
        }],
        status: "online"
    })
});

client.commands = new Collection();
client.aliases = new Collection();
//command handler
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    console.log(' ')
    let cmdfiles = files.filter(f => f.split(".").pop() === "js");
    if (cmdfiles.length <= 0) {
        return console.log("No command nodes");
    }

    cmdfiles.forEach((f) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            commands.aliases.set(alias, props.help.name);
        })
    })
})
fs.readdir("./fun/", (err, files) => {
    console.log(' ')
    if (err) console.log(err);

    let funfiles = files.filter(f => f.split(".").pop() === "js");
    if (funfiles.length <= 0) {
        return console.log("No command nodes");
    }

    funfiles.forEach((f) => {
        let props = require(`./fun/${f}`);
        console.log(`${f} loaded`);
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            commands.aliases.set(alias, props.help.name);
        })
    })
})
fs.readdir("./mod/", (err, files) => {
    console.log(' ')
    if (err) console.log(err);

    let modfiles = files.filter(f => f.split(".").pop() === "js");
    if (modfiles.length <= 0) {
        return console.log("No command nodes");
    }

    modfiles.forEach((f) => {
        let props = require(`./mod/${f}`);
        console.log(`${f} loaded`);
        client.commands.set(props.help.name, props);

        props.help.aliases.forEach(alias => {
            commands.aliases.set(alias, props.help.name);
        })
    })
})

client.on("messageCreate", async message => {
    if (message.author.id === client.user.id) return;
    if (!message.content.startsWith(config.prefix)) return;
    let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let command;

    if (client.commands.has(cmd)) {
        command = client.commands.get(cmd);
    } else if (client.aliases.has(cmd)) {
        command = client.command.get(client.aliases.get(cmd));
    }

    try {
        command.run(client, message, args);
    } catch (e) {
        return;
    }
})

client.login(config.token);

/*
client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'nukerhelpbutton') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("VMT Nuker")
                        .setDescription("__Welcome to the help for Nuker__")
                        .addFields(
                            { name: "**Commands**", value: "> `v?nuker channelspam <name>`\n> `v?nuker userspam <@user>`\n> `v?nuker chaos`\n> `v?nuker nukemessages`" }
                        )
                        .setFooter("VMT Created by ViiPer LLC")
                ]
            })
        } else if (interaction.customId === 'serverhelpbutton') {
            interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setTitle("VMT Servers")
                        .setDescription("__Welcome to the VMT affiliates__")
                        .addFields(
                            { name: "**Servers**", value: "> **03Gens** - [Click Here](https://discord.gg/nahBvG6EbC)\n> **ViiPer** - [Click Here](https://discord.gg/X4VxE5JEYB)" }
                        )
                        .setFooter("VMT Created by ViiPer LLC")
                ]
            })
        }
    }
})
*/
