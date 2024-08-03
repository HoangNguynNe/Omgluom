const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "bully",
  aliases: [],
  description: "Bắt nạt người khác",
  run: async (client, message, args) => {
    const gif = await anime.bully();
    if (!args.length) return message.reply("Bạn cần tag ít nhất một người để bắt nạt!");
    const taggedUsers = message.mentions.users.map(user => user).join(", ");
    const embed = new EmbedBuilder()
      .setDescription(`<a:FH_Meohamieng:875714411929694248> ${message.author} đã bắt nạt ${taggedUsers}`)
      .setImage(gif)
      .setColor('#FF6347');
    
    message.channel.send({ embeds: [embed] });
  }
};
