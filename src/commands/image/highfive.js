const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "highfive",
  aliases: ['hf'],
  description: "Đập tay",
  run: async (client, message, args) => {
    const gif = await anime.highfive();
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const description = taggedUsers ? `<a:ICE_meoapple:1132631455558807602> ${message.author} đã đập tay với ${taggedUsers}` : `<a:ICE_meoapple:1132631455558807602> ${message.author} tự đập tay`;
    const embed = new EmbedBuilder()
      .setDescription(description)
      .setImage(gif)
      .setColor('#FF4500');
    
    message.channel.send({ embeds: [embed] });
  }
};
