const {SlashCommandBuilder} = require('@discordjs/builders');
let Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        feed: ['title', 'link', 'description'],
        item: ['media:thumbnail', 'description', {keepArray: true}]
    }
});
const Client = require('discord.js')
let i=0;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('mal')
        .setDescription('update news mal'),
        async execute(message) {
            let feed = await parser.parseURL('https://www.myanimelist.net/rss/news.xml');
            function formatDate(date) {
                return date.toLocaleString('en-GB');
              }

            console.log(feed.title);
            
            feed.items.every( item => {
            let date = formatDate(new Date(item.pubDate))
            let embed = new Client.MessageEmbed()
                .setTitle(`[${i+1}]` + ' ' + item.title)
                .setURL(item.link)
                .setColor('#0099ff')
                .setImage(item['media:thumbnail'])
                .setDescription(date + '\n' + '\n' + item['description'])
                
               
               i++;
               let serverMessage =  message.channel.send({ embeds: [embed] });
               if (i>=5) return false
               else return true
               
            });
        
          
        }
}