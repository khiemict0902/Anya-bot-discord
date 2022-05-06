const {SlashCommandBuilder} = require('@discordjs/builders');
const { API, TagTypes, } = require('nhentai-api');
const api = new API();
const Client = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('nht')
        .setDescription('send hentai'),
        async execute(message, args) {
            api.getBook(args).then(book => {
                let embed = new Client.MessageEmbed()
                    .setTitle(book.title.english)
                    .setURL(`https://nhentai.net/g/${args}`)
                    .setColor('#0099ff')
                    .setImage(api.getImageURL(book.cover))

                let serverMessage = message.channel.send({ embeds: [embed] });
            });
          
        }
}

