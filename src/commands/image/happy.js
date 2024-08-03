const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "happy",
  aliases: [],
  description: "Vui vẻ",
  run: async (client, message, args) => {
    const gif = await anime.happy();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_gaucute2:1012195274304798841> ${message.author} đang rất vui vẻ`)
      .setImage(gif)
      .setColor('#FFFF00');
    
    message.channel.send({ embeds: [embed] });
  }
};
