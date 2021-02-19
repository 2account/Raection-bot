const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

 let channel = message.mentions.channels.first() 
  if(!channel) return message.channel.send(`Please mention a channel`)
 
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(message.author.tag,message.author.avatarURL())
    .setDescription(`Set The Level Channel As ${channel}`)
    message.channel.send(embed)
  db.set(`levelchannel_${message.guild.id}`, channel.id)
}

module.exports.help = {
  name: "lvlchannel",
  description: "change level channel",
  usage: "lvlchannel <channel>",
  aliases: ["levelchannel"]
};