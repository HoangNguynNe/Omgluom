const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "scream",
  aliases: [],
  description: "Hét lên",
  run: async (client, message, args) => {
    const gif = await anime.scream();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_anime:1012195201466507274> ${message.author} hét lên`)
      .setImage(gif)
      .setColor('#FF0000');
    
    message.channel.send({ embeds: [embed] });
  }
};
