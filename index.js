const { Client, Intents, Collection } = require('discord.js');
const { token, prefix } = require('./config.json');
const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,
Intents.FLAGS.GUILD_MESSAGES] });

const { REST } = require('@discordjs/rest');
const { Route } = require('discord-api-types/v9');  

const commands = [];  
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) {
    return;
  }

  try {
    client.commands.get(commandName).execute(message, args, client.commands);
  } catch (err) {
    console.log('An error occurred while handling the message.');
    console.log(err);
  }

  const author = message.author.tag;
  const server = message.guild.name;
  console.log(`User ${author} from server ${server} said: ${message.content}`);
  console.log(args + ' ' + commandName);

}
);

client.login(token);

