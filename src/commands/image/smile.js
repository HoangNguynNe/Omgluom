const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "smile",
  aliases: [],
  description: "Cười",
  run: async (client, message, args) => {
    const gif = await anime.smile();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_gauwow:1139501469616316436> ${message.author} đang cười`)
      .setImage(gif)
      .setColor('#FFD700');
    
    message.channel.send({ embeds: [embed] });
  }
};
