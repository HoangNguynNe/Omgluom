const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "bored",
  aliases: [],
  description: "Chán nản",
  run: async (client, message, args) => {
    const gif = await anime.bored();
    const embed = new EmbedBuilder()
      .setDescription(`<:ICE_behoicham:1099724367618900009> ${message.author} đang chán nản`)
      .setImage(gif)
      .setColor('#808080');
    
    message.channel.send({ embeds: [embed] });
  }
};
