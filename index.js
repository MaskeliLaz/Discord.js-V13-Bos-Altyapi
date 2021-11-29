const Discord = require('discord.js');
const config = require('./botConfig.json');
const { Client, Intents, Permissions, MessageEmbed, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });
const fs = require('fs');
const moment = require('moment');
//const db = require('quick.db');

var prefix = config.BotPrefix;

moment.locale("tr");

//Command Handler

client.commands = new Collection();
client.aliases = new Collection();
client.cmdStatus = new Collection();

const cmdAll = fs.readdirSync('./komutlar').filter(cmd => cmd.endsWith('.js'))
    for(const cmd of cmdAll){
        let efebeyS = require(`./komutlar/${cmd}`)
        if(efebeyS){
        if(efebeyS.help.name){
        	if(efebeyS.conf.cmdStatus){
        		if(efebeyS.conf.cmdStatus === true){
                   console.log(`Yüklenen Komut => ${efebeyS.help.name} | ${moment().format("LTS")} => Açık`)
                   client.commands.set(efebeyS.help.name, efebeyS)
				   client.cmdStatus.set(efebeyS.conf.cmdStatus, efebeyS)
        		} else if(efebeyS.conf.cmdStatus === false)return;
        	}
        }
    }
    efebeyS.conf.aliases.forEach(alias => {
        client.aliases.set(alias, efebeyS.help.name)
    })
}

client.on("messageCreate", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.BotPrefix)) return;
  let command = message.content.split(' ')[0].slice(config.BotPrefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if(client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if(client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else if(client.cmdStatus.has(command)) {
  	cmd = client.commands.get(client.cmdStatus.get(command))
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let izinSeviye = 0;
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) izinSeviye = 1;
    if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) izinSeviye = 2;
    if (message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) izinSeviye = 3;
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) izinSeviye = 4;
    if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) izinSeviye = 5;
    if (message.author.id === config.sahipId) izinSeviye = 6;
    return izinSeviye;
};

//Command Handler (Son)

//Ready.js

client.on("ready", () => {
	console.log("----------------------------")
	console.log("-> Tüm komutlar ve index.js Yüklendi.")
	console.log("-> Ready.js Açıldı.")
	console.log(`=> Bot Aktif. | ${moment().format("LLL")}`)
	console.log("----------------------------")

	client.user.setStatus("online")
	client.user.setActivity("Discord.js v13 Boş Altyapı | Coder By EfeBey")
});

client.login(config.BotToken);

//Ready.js (Son)
//Coder By EfeBey
