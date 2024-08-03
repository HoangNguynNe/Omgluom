const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "cry",
  aliases: [],
  description: "Khóc",
  run: async (client, message, args) => {
    const gif = await anime.cry();
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_ebekhoc:1134405199419682886> ${message.author} đang khóc`)
      .setImage(gif)
      .setColor('#1E90FF');
    
    message.channel.send({ embeds: [embed] });
  }
};
