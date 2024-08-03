const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "sad",
  aliases: [],
  description: "Buồn",
  run: async (client, message, args) => {
    const gif = await anime.sad();
    const embed = new EmbedBuilder()
      .setDescription(`<a:icebuon:1230755564301058089> ${message.author} đang buồn`)
      .setImage(gif)
      .setColor('#1E90FF');
    
    message.channel.send({ embeds: [embed] });
  }
};
