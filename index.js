const Discord = require("discord.js")
const config = require("./config.json")
const db = require("quick.db")
const fs = require("fs");
const client = new Discord.Client({
  fetchAllMembers: true,
  partials: ["MESSAGE", "USER", "REACTION"]
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Could not find any commands");
    return;
  }
  jsfile.forEach(f => {
    let props = require(`./cmds/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
fs.readdir("./events/", (err, files) => {
  if (err) console.log(err);

  let jsfile1 = files.filter(f => f.split(".").pop() === "js");
  if (jsfile1.length <= 0) {
    console.log("Could not find any events");
    return;
  }
  jsfile1.forEach(f => {
    const eventName = f.split(".")[0];
    console.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${f}`);

    client.on(eventName, event.bind(null, client));
  });
});


/*client.on("message", message => {
  let user = message.author;
  db.add(`xp_${message.guild.id}_${user.id}`, 3);
  db.add(`messages_${message.guild.id}_${message.author.id}`, 1);
  let messagefetch = db.fetch(
    `messages_${message.guild.id}_${message.author.id}`
  );
  let messages;
  if (messagefetch == 25) messages = 25;
  //Level 1
  else if (messagefetch == 65) messages = 65;
  // Level 2
  else if (messagefetch == 115) messages = 115;
  // Level 3
  else if (messagefetch == 200) messages = 200;
  // Level 4
  else if (messagefetch == 300) messages = 300;
  // Level 5
  else if (messagefetch == 375) messages = 375;
  //level 6
  else if (messagefetch == 500) messages = 500;
  // Level 7
  else if (messagefetch == 575) messages = 575;
  // Level 8
  else if (messagefetch == 700) messages = 700;
  // Level 9
  else if (messagefetch == 775) messages = 775;
  // Level 10
  else if (messagefetch == 1000) messages = 1000;
  // level 11
    else if (messagefetch == 1150) messages = 1150;
  // Level 12
  else if (messagefetch == 1250) messages = 1250;
  // Level 13
  else if (messagefetch == 1350) messages = 1350;
  // Level 14
  else if (messagefetch == 1500) messages = 1500;
  // Level 15
  else if (messagefetch == 1650) messages = 1650;
  // level 16
  else if (messagefetch == 1750) messages = 1750;
  // Level 17
  else if (messagefetch == 1900) messages = 1900;
  // Level 18
  else if (messagefetch == 2050) messages = 2050;
  // Level 19
  else if (messagefetch == 2250) messages = 2250;
  // Level 20
  else if (messagefetch == 2500) messages = 2500;
  // level 21
  // ADD MORE IF U WANT
  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    let levelfetch = db.fetch(
      `level_${message.guild.id}_${message.author.id}`
    );
    let levelembed = new Discord.MessageEmbed()
      .setDescription(
        `${message.author}, You have leveled up to level ${levelfetch}`
      )
      .setColor(`#66ff99`)
      .setAuthor(`${message.author.tag}`, message.author.avatarURL());
    message.channel.send(levelembed);
    let levelembed2 = new Discord.MessageEmbed()
      .setDescription(
        `<a:star:747477610170417283> ${message.author}, Leveled Up to Level ${levelfetch}`
      )
      .setColor(`#66ff99`)
      .setAuthor(`${message.author.tag}`, message.author.avatarURL());
    client.channels.cache.get(`${db.fetch(`levelchannel_${message.guild.id}`)}`).send(levelembed2);
  }
});*/



client.on("ready", () => {
console.log(`Ready ;)`)
})


client.on('message', msg => {
  if(msg.content === '-invite') {
      let embed = new Discord.MessageEmbed()
      .setTitle('Invite Me!')
      .setURL('https://discord.com/api/oauth2/authorize?client_id=809757376138838027&permissions=8&scope=bot')
      .setColor('RANDOM')
      .setDescription('Invite me to your server today!!')
      .addField(`Bot Invite!`, `[Click Here To invite Me!](https://discord.com/api/oauth2/authorize?client_id=809757376138838027&permissions=8&scope=bo=)`)
      .setTimestamp()
      .setFooter('Dette er en footer!')
      msg.channel.send(embed)
  }
});


client.login(process.env.token)