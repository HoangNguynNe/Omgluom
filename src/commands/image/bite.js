const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "bite",
  aliases: [],
  description: "Cắn người khác hoặc tự cắn",
  run: async (client, message, args) => {
    const gif = await anime.bite();
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const description = taggedUsers ? `<a:ICE_meocatnhay:1132868076786946099> ${message.author} đã cắn ${taggedUsers}` : `<a:ICE_meocatnhay:1132868076786946099> ${message.author} tự cắn chính mình`;
    const embed = new EmbedBuilder()
      .setDescription(description)
      .setImage(gif)
      .setColor('#FF4500');
    
    message.channel.send({ embeds: [embed] });
  }
};
