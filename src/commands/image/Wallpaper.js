const anime = require('anime-actions');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "wallpaper",
  aliases: [],
  description: "Tải một hình nền anime đẹp",
  run: async (client, message, args) => {
    const gif = await anime.wallpaper();
    const embed = new EmbedBuilder()
      .setDescription(`${message.author} đã tải hình nền anime đẹp`)
      .setImage(gif)
      .setColor('#00CED1');
    
    message.channel.send({ embeds: [embed] });
  }
};
