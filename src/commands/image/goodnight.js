const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "goodnight",
  aliases: ['gn'],
  description: "Chúc ngủ ngon",
  run: async (client, message, args) => {
    const gif = await anime.goodnight();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_meocatrub:1012195227160809492> ${message.author} chúc mọi người ngủ ngon`)
      .setImage(gif)
      .setColor('#4B0082');
    
    message.channel.send({ embeds: [embed] });
  }
};
