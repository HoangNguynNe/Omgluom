const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "wave",
  aliases: [],
  description: "Vẫy tay",
  run: async (client, message, args) => {
    const gif = await anime.wave();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_animetimmm:952183392626176030> ${message.author} vẫy tay`)
      .setImage(gif)
      .setColor('#1E90FF');
    
    message.channel.send({ embeds: [embed] });
  }
};
