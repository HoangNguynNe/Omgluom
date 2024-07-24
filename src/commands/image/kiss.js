const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "kiss",
  aliases: [],
  description: "Hôn người khác hoặc tự hôn",
  run: async (client, message, args) => {
    const gif = await anime.kiss();
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const description = taggedUsers ? `<a:ICE_meoboop:930002014237253633> ${message.author} đã hôn ${taggedUsers}` : `<a:ICE_meoboop:930002014237253633> ${message.author} tự hôn chính mình`;
    const embed = new EmbedBuilder()
      .setDescription(description)
      .setImage(gif)
      .setColor('#FF1493');
    
    message.channel.send({ embeds: [embed] });
  }
};
