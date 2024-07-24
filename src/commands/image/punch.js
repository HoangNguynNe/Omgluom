const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "punch",
  aliases: [],
  description: "Đấm người khác",
  run: async (client, message, args) => {
    const gif = await anime.punch();
    if (!args.length) return message.reply("Bạn cần tag ít nhất một người để đấm!");
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_cuoikhinh:1138868421086425200> ${message.author} đã đấm ${taggedUsers}`)
      .setImage(gif)
      .setColor('#8B0000');
    
    message.channel.send({ embeds: [embed] });
  }
};
