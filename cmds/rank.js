  
const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag,message.author.avatarURL())
    .setDescription(`LeveL: ${db.fetch(`level_${message.guild.id}_${message.author.id}`) || "0"}\nXP: ${db.fetch(`xp_${message.guild.id}_${message.author.id}`) || "0"}`)

    message.channel.send(embed)
}

module.exports.help = {
  name: "rank",
  description: "Lists your rank",
  usage: "rank",
  aliases: ["level"]
};