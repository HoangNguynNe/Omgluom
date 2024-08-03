const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "yeet",
  aliases: [],
  description: "Ném người khác",
  run: async (client, message, args) => {
    const gif = await anime.yeet();
    if (!args.length) return message.reply("Bạn cần tag ít nhất một người để ném!");
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const embed = new EmbedBuilder()
      .setDescription(`<a:ICE_lacbottom:1132639119609188392> ${message.author} đã ném ${taggedUsers}`)
      .setImage(gif)
      .setColor('#FF4500');
    
    message.channel.send({ embeds: [embed] });
  }
};
