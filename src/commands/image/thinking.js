const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "thinking",
  aliases: [],
  description: "Đang suy nghĩ",
  run: async (client, message, args) => {
    const gif = await anime.thinking();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_ebezolaextasy:1012195452432699432> ${message.author} đang suy nghĩ`)
      .setImage(gif)
      .setColor('#FFD700');
    
    message.channel.send({ embeds: [embed] });
  }
};
