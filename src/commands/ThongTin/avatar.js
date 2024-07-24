const { Client, Message, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "🔰 Thông Tin",
  aliases: ["av", "avt"],
  usage: "<PREFIX>avatar",
  description: "Xem avatar ",
  run: async (client, message, args) => { 

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

    const png = member.user.displayAvatarURL({ dynamic: false, format: 'png' });
    const jpg = member.user.displayAvatarURL({ dynamic: false, format: 'jpg' });
    const webp = member.user.displayAvatarURL({ dynamic: false, format: 'webp' });
    const gif = member.user.displayAvatarURL({ dynamic: true });

    const avatarMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('main')
        .setPlaceholder('Chọn kích thước hình ảnh')
        .addOptions([
          {
            label: '128 pixels',
            value: "Option 1",
            emoji: '🖼️',
          },
          {
            label: '256 pixels',
            value: "Option 2",
            emoji: '🖼️',
          },
          {
            label: '[Original] 1024 pixels',
            value: "Option 0",
            emoji: '🖼️',
          },
        ]),
    );

    const avtEmbed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('Size : 1024px')
      .setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
      .setDescription(`Tải ảnh đại diện xuống tại:\n**[png](${png}) | [jpg](${jpg}) | [gif](${gif}) | [webp](${webp})**` || `**[png](${png}) | [jpg](${jpg})**`);

    let avt = await message.channel.send({ content: 'Avatar ' + member.user.tag, embeds: [avtEmbed], components: [avatarMenu] });

    const filter = interaction => {
      if (interaction.user.id !== message.author.id) {
        interaction.reply({
          content: "Không giúp người khác chọn menu",
          ephemeral: true
        });
        return false;
      }
      return true;
    };

    const collector = avt.createMessageComponentCollector({
      filter,
      componentType: ComponentType.SelectMenu,
      time: 50000,
    });

    collector.on('collect', async (menu) => {
      if (menu.values[0] === 'Option 1') {
        menu.update({
          embeds: [
            avtEmbed.setTitle('Size : 128px').setImage(member.user.displayAvatarURL({ size: 128, dynamic: true, format: 'png' }))
          ]
        });
      } else if (menu.values[0] === 'Option 0') {
        menu.update({
          embeds: [
            avtEmbed.setTitle('Size : 1024px').setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true, format: 'png' }))
          ]
        });
      } else if (menu.values[0] === 'Option 2') {
        menu.update({
          embeds: [
            avtEmbed.setTitle('Size : 256px').setImage(member.user.displayAvatarURL({ size: 256, dynamic: true, format: 'png' }))
          ]
        });
      }
    });

    collector.on('end', async (menu) => {
      avt.edit({ components: [] });
    });
  }
};
