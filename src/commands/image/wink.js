const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "wink",
  aliases: [],
  description: "Nháy mắt",
  run: async (client, message, args) => {
    const gif = await anime.wink();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_animedasnice:1012195340969054299> ${message.author} nháy mắt`)
      .setImage(gif)
      .setColor('#FF69B4');
    
    message.channel.send({ embeds: [embed] });
  }
};
