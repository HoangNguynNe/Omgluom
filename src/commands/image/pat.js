const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "pat",
  aliases: [],
  description: "Xoa đầu người khác hoặc tự xoa đầu",
  run: async (client, message, args) => {
    const gif = await anime.pat();
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const description = taggedUsers ? `<a:ICE_meoEmDongY:1130163160125546597> ${message.author} đã xoa đầu ${taggedUsers}` : `<a:ICE_meoEmDongY:1130163160125546597> ${message.author} tự xoa đầu chính mình`;
    const embed = new EmbedBuilder()
      .setDescription(description)
      .setImage(gif)
      .setColor('#FFD700');
    
    message.channel.send({ embeds: [embed] });
  }
};
