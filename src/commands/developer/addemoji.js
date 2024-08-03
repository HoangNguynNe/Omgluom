const { Client, Message, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { parseEmoji } = require('../../util/emojiUtils');

module.exports = {
  name: 'addemoji',
  description: 'Thêm emoji vào server của bạn',
  cooldown: 5,
  aliases: ['aemoji'],
  owner: true,
  usage: '<PREFIX>addemoji (link)/:emoji: (name)',
  run: async (client, message, args) => {
    const prefix = client.config.PREFIX;
    try {
      if (!args[0] || !args[1]) return client.func.error(`Không đúng cách! Ví dụ: ${prefix}addemoji (link) /:emoji: (name)`, message.channel);

      const missingPermissions = message.guild.members.me.permissions.missing(PermissionsBitField.Flags.ManageEmojisAndStickers);
      if (missingPermissions.includes(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
        return message.channel.send({
          embeds: [new EmbedBuilder()
            .setDescription(`Bot không có quyền \`MANAGE_EMOJIS_AND_STICKERS\``)
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')]
        });
      }

      if (!message.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
        return message.channel.send({
          embeds: [new EmbedBuilder()
            .setDescription(` **Bạn không có quyền \`MANAGE_EMOJIS_AND_STICKERS\`**`)
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RED')]
        });
      }

      if (args[0].startsWith('http://') || args[0].startsWith('https://')) {
        const URL = args[0];
        message.guild.emojis.create({ attachment: URL, name: args[1] })
          .then(emoji => {
            message.channel.send(`${emoji} đã được tải lên!`);
          })
          .catch(err => {
            if (err.message.includes('File cannot be larger than 256.0 kb')) {
              message.channel.send({
                embeds: [new EmbedBuilder()
                  .setDescription(`File không thể lớn hơn 256kb`)
                  .setColor('RED')
                  .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })]
              });
            } else {
              client.func.error(`Đã xảy ra lỗi: ${err.message}`, message.channel);
            }
          });
      } else if (args[0].includes(':')) {
        if (!args[0]) {
          return client.func.error(`Không đúng cách! Ví dụ: ${prefix}addemoji (link) /:emoji: (name)`, message.channel);
        }

        const emoji = parseEmoji(args[0]);
        if (!emoji) {
          return client.func.error(`Emoji không hợp lệ!`, message.channel);
        }

        const URL = emoji.animated 
          ? `https://cdn.discordapp.com/emojis/${emoji.id}.gif?v=1`
          : `https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1`;

        message.guild.emojis.create({ attachment: URL, name: args[1] })
          .then(emoji => {
            message.channel.send(`**${emoji} đã được tải lên!**`);
          })
          .catch(err => {
            client.func.error(`Đã hết slot thêm emoji mới`, message.channel);
          });
      }
    } catch (err) {
      message.channel.send(`\`\`\`${err}\`\`\``);
      client.func.error(`Không thể thêm emoji này`, message.channel);
    }
  }
};
