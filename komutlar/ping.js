const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const config = require("../botConfig.json");

var prefix = config.BotPrefix;

exports.run = function(client, message) {
	let normal = new MessageEmbed()
	.setColor("GREEN")
	.setDescription(`:alarm_clock: Bot Pingi => **${client.ws.ping}ms**\nDurum => 🟢 **Normal**`)
	.setFooter(client.user.username)
	.setTimestamp()
	
	let orta = new MessageEmbed()
	.setColor("GREEN")
	.setDescription(`:alarm_clock: Bot Pingi => **${client.ws.ping}ms**\nDurum => 🟡 **Orta**`)
	.setFooter(client.user.username)
	.setTimestamp()
	
	let maksimum = new MessageEmbed()
	.setColor("GREEN")
	.setDescription(`:alarm_clock: Bot Pingi => **${client.ws.ping}ms**\nDurum => 🔴 **Yüksek**`)
	.setFooter(client.user.username)
	.setTimestamp()
	
	if(client.ws.ping < 200){
		message.channel.send({embeds: [normal]})
	};
	
	if(client.ws.ping > 200){
		message.channel.send({embeds: [orta]})
	};
	
	if(client.ws.ping > 400){
		message.channel.send({embeds: [maksimum]})
	};
}

exports.conf = {
	cmdStatus: true,
	aliases: [],
	izinSeviye: 0
};

exports.help = {
	name: "ping"
};

//Coder By EfeBey