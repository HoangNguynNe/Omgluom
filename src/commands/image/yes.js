const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "yes",
  aliases: [],
  description: "Đồng ý",
  run: async (client, message, args) => {
    const gif = await anime.yes();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_gaugatdau:1139026991908134973> ${message.author} đồng ý`)
      .setImage(gif)
      .setColor('#00FF00');
    
    message.channel.send({ embeds: [embed] });
  }
};
