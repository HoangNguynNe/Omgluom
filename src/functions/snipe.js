const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");

// Danh sách phần mở rộng tệp ảnh và video
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".webm", ".mp4", ".mov"];

async function snipe(client) {
  client.snipes = new Map();

  client.on("messageDelete", async (message) => {
    // Kiểm tra nếu tin nhắn là một phần

    // Kiểm tra nếu tin nhắn có tệp đính kèm
    const attachments = message.attachments.first();
    let attachmentType = null;
    let attachmentURL = null;

    if (attachments) {
      const ext = attachments.name ? attachments.name.split('.').pop().toLowerCase() : '';
      if (picExt.includes(`.${ext}`)) {
        attachmentType = 'image';
        attachmentURL = attachments.proxyURL;
      } else if (videoExt.includes(`.${ext}`)) {
        attachmentType = 'video';
        attachmentURL = attachments.proxyURL;
      }
    }

    // Lưu lại tin nhắn đã xóa vào map
    let snipes = client.snipes.get(message.channel.id) || [];
    snipes.unshift({
      channel: message.channel,
      content: message.content || null,
      author: message.author,
      attachmentType,
      attachmentURL,
      date: new Date(),
    });

    // Giới hạn số lượng mục trong mảng `snipes` là 10
    snipes = snipes.slice(0, 10);
    client.snipes.set(message.channel.id, snipes);
  });
}

module.exports = snipe;