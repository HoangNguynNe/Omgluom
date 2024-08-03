const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "poke",
  aliases: [],
  description: "Chọc người khác",
  run: async (client, message, args) => {
    const gif = await anime.poke();
    if (!args.length) return message.reply("Bạn cần tag ít nhất một người để chọc!");
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const embed = new EmbedBuilder()
      .setDescription(`<:ICE_fak:1141276672688140358> ${message.author} đã chọc ${taggedUsers}`)
      .setImage(gif)
      .setColor('#FFA500');
    
    message.channel.send({ embeds: [embed] });
  }
};
