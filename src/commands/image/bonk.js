const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "bonk",
  aliases: [],
  description: "Đập đầu người khác",
  run: async (client, message, args) => {
    const gif = await anime.bonk();
    if (!args.length) return message.reply("Bạn cần tag ít nhất một người để đập đầu!");
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const embed = new EmbedBuilder()
      .setDescription(`<:ICE_xamlol:1249682101989544029> ${message.author} đã đập đầu ${taggedUsers}`)
      .setImage(gif)
      .setColor('#8B0000');
    
    message.channel.send({ embeds: [embed] });
  }
};