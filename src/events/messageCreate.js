const { MessageEmbed, Message, Client, Collection, ChannelType, PermissionsBitField } = require("discord.js");
const ms = require("ms");
const cooldowns = new Collection();
const Timeout = new Set();

module.exports = async (client, message) => {
  if (message.channel.type === ChannelType.DM && !message.author.bot) {
    const guilds = client.guilds.cache.get('1001022664154038272');
    const ChRules = guilds.channels.cache.get('1001403860906156072');
    let a = await ChRules.send(`Tin nhắn được gửi bởi **${message.author.username}**, với nội dung:\n\`\`\`${message.content}\n\`\`\``);
    await a.reply(`${message.author.id}`);
  }
  if (!message.guild) return;
  if (message.author.bot) return;

  let prefix = client.config.PREFIX;
  await message.channel.messages.fetch();
  if (message.content.includes(`${client.user.id}`))
    message.channel.send(`**Prefix của tớ là: **\`${prefix}\``);
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) {
    if (!checkMsgPerm(message)) {
      return message.author.send(`**Tớ không có đủ quyền ở kênh ${message.channel} vui lòng cập nhật cho tớ những quyền bên dưới!**`)
        .catch(err => console.log(`${message.author.id} không mở DMs`));
    }

    let check = false;
    let owners = client.config.ownerID;
    if (!owners.includes(message.author.id)) check = true;
    if (message.author.id == "906022231279288380") check = false;
    if (command.owner === true && check === true) return;

    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

    console.log(`${message.author.tag} used cmd ${command.name} in ${message.guild.name}`);
    client.channels.cache.get('998072537336533012').send(`<:icons_Correct:1007836636995928114> ${message.author.tag} | ID: ${message.author.id} đã sử dụng lệnh \`${command.name}\` \n<a:DCAFE_INFO:1008297433563926670> trong máy chủ ${message.guild.name} [${message.guild.id}] | \n<:TextChannel:1009085916876386375> Kênh ${message.channel.name} (${message.channel.id}) <t:${Math.floor(Date.now() / 1000)}>`);
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;
    
    if (timestamps.has(message.author.id) && check === true) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`**⏱ Bạn chỉ có thể sử dụng lệnh này sau **\`${timeLeft.toFixed(1)}\`**s**`)
          .then(msg => setTimeout(() => msg.delete(), timeLeft * 1000));
      }
    }
    
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
    let botperms = [];
    if (command.clientPermissions) {
      command.clientPermissions.forEach((p) => {
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags[p])) botperms.push("`" + p + "`");
      });
      if (botperms.length > 0) {
        return client.func.error(`${client.emoji.warning} Tớ cần quyền ${botperms.join(", ")} để có thể chạy lệnh này`, message.channel);
      }
    }

    function checkMsgPerm(message) {
      const botPerms = message.channel.permissionsFor(client.user);
      return botPerms.has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AddReactions]);
    }

    command.run(client, message, args);
  }
};
