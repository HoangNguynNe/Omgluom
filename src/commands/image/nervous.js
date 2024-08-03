const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "nervous",
  aliases: [],
  description: "Lo lắng",
  run: async (client, message, args) => {
    const gif = await anime.nervous();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_ebexoamat:1021003596277489765> ${message.author} đang lo lắng`)
      .setImage(gif)
      .setColor('#FFD700');
    
    message.channel.send({ embeds: [embed] });
  }
};
