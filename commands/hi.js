const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hi')
        .setDescription('Say hi to the bot'),
        async execute(message, args) {
          let serverMessage = await message.channel.send("Hi! I'm Khiem's waifu UwU");
          
        }
}

