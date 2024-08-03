const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "confused",
  aliases: [],
  description: "Bối rối",
  run: async (client, message, args) => {
    const gif = await anime.confused();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_ebehunchutchut:962284822833799218> ${message.author} đang bối rối`)
      .setImage(gif)
      .setColor('#808080');
    
    message.channel.send({ embeds: [embed] });
  }
};
