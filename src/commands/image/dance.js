const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "dance",
  aliases: [],
  description: "Nhảy múa",
  run: async (client, message, args) => {
    const gif = await anime.dance();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_qmusicbeat:920227785539223553> ${message.author} đang nhảy múa vui vẻ`)
      .setImage(gif)
      .setColor('#FF69B4');
    
    message.channel.send({ embeds: [embed] });
  }
};
