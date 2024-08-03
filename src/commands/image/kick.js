const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "kick",
  aliases: [],
  description: "Đá người khác",
  run: async (client, message, args) => {
    const gif = await anime.kick();
    if (!args.length) return message.reply("Bạn cần tag ít nhất một người để đá!");
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_baehehe:1142711632435355699> ${message.author} đã đá ${taggedUsers}`)
      .setImage(gif)
      .setColor('#8B0000');
    
    message.channel.send({ embeds: [embed] });
  }
};
