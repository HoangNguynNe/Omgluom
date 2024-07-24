const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "stare",
  aliases: [],
  description: "Nhìn chằm chằm",
  run: async (client, message, args) => {
    const gif = await anime.stare();
    const embed = new EmbedBuilder()
      .setDescription(`<:ICE_meo:1131803465362972843> ${message.author} đang nhìn chằm chằm`)
      .setImage(gif)
      .setColor('#0000FF');
    
    message.channel.send({ embeds: [embed] });
  }
};
