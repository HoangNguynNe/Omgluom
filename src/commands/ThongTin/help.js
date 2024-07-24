const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");
const config = require('../../assets/json/config.json');

module.exports = { 
    name: "help",
  description: "Ghi lại tin nhắn đã bị xoá",
  cooldown: 5,
  aliases: ["hp"],
  category: "🔰 Thông Tin",
  usage: "<PREFIX>help",
run: async (client, message, args) => {
  const embed = new EmbedBuilder()
    .setTitle(`<a:ICE_ghim:914107547403821086> Bảng hỗ trợ bot ${client.user.username} <a:ICE_timlaplanh:914107571206500382>`)
    .setColor('#2F3136')
    .setDescription('**<a:ICE_muiten:1021012134274011166> Hãy click vào ô phía dưới để chọn nhé <:ICE_traitym:1011615064618442873>** \nBot còn mới nên nếu lỗi gì hay bạn muốn nâng cấp gì hãy chat **igopy + Nội dung** để chúng tớ khắc phục lại nhé')
    .addFields({ name: `ICE Z FAMILY:`, value: `- [Discord ICE](https://discord.gg/xZDCwKwVvD)`, inline: true })
    .setTimestamp()
    .setFooter({
      text: `Được yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

  const giveaway = new EmbedBuilder()
    .setTitle("<a:ICE_giveaway3:1021038376771661947> Giveaway <a:ICE_giveaway3:1021038376771661947>")
    .setColor('#2F3136')
    .setDescription("```yaml\n**Giveaway** sẽ có những lệnh sau:```")
    .addFields(
      { name: 'Start', value: `Bắt đầu giveaway - Tự động dms về người dùng khi họ trung giveaway`, inline: true },
      { name: 'Edit', value: `Chỉnh sửa giveaway!`, inline: true },
      { name: 'End', value: `Kết thúc giveaway!`, inline: true },
      { name: 'List', value: `Danh sách giveaway trong server!`, inline: true },
    )
    .setTimestamp()
    .setFooter({
      text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

  const general = new EmbedBuilder()
    .setTitle("<a:ICE_I:932534459318804540> <a:ICE_C:935096345834975232> <a:ICE_E:935179871271944273> ")
    .setColor('#2F3136')
    .setDescription("```yaml\nCác lệnh đang khả dụng:```")
    .addFields(
      { name: 'Help', value: `Hiển thị tất cả các lệnh của bot!`, inline: true },
      { name: 'avatar', value: `Xem avatar của bạn hoặc aido!`, inline: true },
      { name: 'math', value: `Không biết tính ? Hãy để ICE Home!`, inline: true },
      { name: 'snipe', value: `Xem lại tin nhắn mà ai đó vừa xóa!`, inline: true },
      { name: 'emoji', value: `Thêm emoji vào server [iemoji + emoji + tên]!`, inline: true },
    )
    .setTimestamp()
    .setFooter({
      text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

    const image = new EmbedBuilder()
      .setTitle("<a:ICE_hopnhan1:1130026575950262362> Image<a:ICE_hopnhan2:1130026689087418378>")
      .setColor('#2F3136')
      .setDescription("```yaml\nImage sẽ có những lệnh sau:```")
      .addFields(
        { name: 'kill', value: `Giết chết người khác!`, inline: true },
        { name: 'baka', value: `Gọi ai đó là đồ ngốc!`, inline: true },
        { name: 'blush', value: `Đỏ mặt!`, inline: true },
        { name: 'cuddle', value: `Ôm ấp người khác!`, inline: true },
        { name: 'bite', value: `Cắn người khác hoặc tự cắn!`, inline: true },
        { name: 'dance', value: `Nhảy múa!`, inline: true },
        { name: 'slap', value: `Tát người khác!`, inline: true },
        { name: 'bonk', value: `Đập đầu người khác!`, inline: true },
        { name: 'bully', value: `Bắt nạt người khác!`, inline: true },
        { name: 'hug', value: `Ôm người khác!`, inline: true },
        { name: 'kiss', value: `Hôn người khác hoặc tự hôn!`, inline: true },
        { name: 'pat', value: `Xoa đầu người khác hoặc tự xoa đầu!`, inline: true },
        { name: 'wallpaper', value: `Tải một hình nền anime đẹp!`, inline: true },
        { name: 'happy', value: `Vui vẻ!`, inline: true },
        { name: 'wink', value: `Nháy mắt!`, inline: true }
      )
      .setTimestamp()
      .setFooter({
        text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
        iconURL: message.author.displayAvatarURL()
      });
    

  const fun = new EmbedBuilder()
    .setTitle("<a:ICE_anime:1012195201466507274> FUN <a:FD_Apinkstar:1113883638422057101>")
    .setColor('#2F3136')
    .setDescription("```yaml\n**FUN** sẽ có những lệnh sau:```")
    .addFields(
      { name: 'chose', value: `Chọn 1 cái gì đó!`, inline: true },
      { name: 'connect4', value: `Trò connect4!`, inline: true },
      { name: 'daomin', value: `Trò đào mìn!`, inline: true },
      { name: 'domoinguoi', value: `Đố mọi người 1 câu gì đó!`, inline: true },
      { name: 'dovui', value: `ICE Home đố bạn 1 câu gì đó!`, inline: true },
      { name: 'timkiem', value: `Tìm kiếm 1 bức hình gì đó @`, inline: true },
      { name: 'tictactoe', value: `Chơi X O!`, inline: true },
      { name: 'type', value: `Cùng nhau xem ai là người gõ nhanh nhất!`, inline: true },
    )
    .setTimestamp()
    .setFooter({
      text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

  const image2 = new EmbedBuilder()
    .setTitle("<a:ICE_Banking:1130351488070324364> Image 2 <a:ICE_Cash:1130351669679493222>")
    .setColor('#2F3136')
    .setDescription("```yaml\nImage 2 sẽ có những lệnh sau:```")
    .addFields(
        { name: 'highfive', value: `Đập tay với người khác!`, inline: true },
        { name: 'wave', value: `Vẫy tay!`, inline: true },
        { name: 'cry', value: `Khóc!`, inline: true },
        { name: 'smile', value: `Cười!`, inline: true },
        { name: 'punch', value: `Đấm người khác!`, inline: true },
        { name: 'kick', value: `Đá người khác!`, inline: true },
        { name: 'poke', value: `Chọc người khác!`, inline: true },
        { name: 'goodnight', value: `Chúc ngủ ngon!`, inline: true },
        { name: 'confused', value: `Bối rối!`, inline: true },
        { name: 'sad', value: `Buồn!`, inline: true },
        { name: 'thinking', value: `Đang suy nghĩ!`, inline: true },
        { name: 'yes', value: `Đồng ý!`, inline: true },
        { name: 'yeet', value: `Ném người khác!`, inline: true },
        { name: 'stare', value: `Nhìn chằm chằm!`, inline: true },
        { name: 'bored', value: `Chán nản!`, inline: true },
        { name: 'scream', value: `Hét lên!`, inline: true },
        { name: 'nervous', value: `Lo lắng!`, inline: true }
    )
    .setTimestamp()
    .setFooter({
      text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

  const res = new EmbedBuilder()
    .setTitle("<a:ICE_tim2:1127852363231793215> Auto responder <a:ICE_bugcat:930002134643122238>")
    .setColor('#2F3136')
    .setDescription("```yaml\n**CHỈ STAFF MỚI DÙNG ĐƯỢC**```")
    .addFields(
      { name: 'ares', value: `Thêm 1 responder [iares [từ] phản hồi]!`, inline: true },
      { name: 'eres', value: `Sửa 1 responder!`, inline: true },
      { name: 'listres', value: `Danh sách các responder!`, inline: true },
      { name: 'rmres', value: `Xóa 1 responder!`, inline: true },
    )
    .setTimestamp()
    .setFooter({
      text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

  const donate = new EmbedBuilder()
    .setTitle("<a:ICE_muiten:1021012134274011166> Donate <a:ICE_muiten:1021012134274011166>")
    .setColor('#2F3136')
    .setDescription("```yaml\n**Donate** sẽ có những lệnh sau:```")
    .addFields(
      { name: 'idn', value: `Xem thông tin donate của bản thân!`, inline: true },
      { name: 'tdn', value: `Xem top donate server!`, inline: true },
    )
    .setTimestamp()
    .setFooter({
      text: `Yêu cầu bởi ${message.author.username} | ` + config.copyright,
      iconURL: message.author.displayAvatarURL()
    });

  const select = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("help")
      .setPlaceholder("Click để chọn trang muốn xem nhé!")
      .addOptions([
        {
          label: "Giveaway",
          description: "Xem các lệnh về giveaway",
          value: "giveaway",
          emoji: "<a:ICE_giveaway3:1021038376771661947>",
        },
        {
          label: "General",
          description: "Xem các lệnh thông thường",
          value: "general",
          emoji: "<a:ICE_I:932534459318804540>",
        },
        {
          label: "Image",
          description: "Xem các lệnh về image",
          value: "image",
          emoji: "<a:ICE_echlilpepe:1012195325886345216>",
        },
        {
          label: "Fun",
          description: "Xem các lệnh về fun",
          value: "fun",
          emoji: "<a:ICE_anime:1012195201466507274>",
        },
        {
          label: "image 2",
          description: "Xem thêm các lệnh về image",
          value: "image2",
          emoji: "<a:ICE_meocatnhay:1132868076786946099>",
        },
        {
          label: "Responder",
          description: "Xem các lệnh về responder",
          value: "res",
          emoji: "<a:ICE_tim2:1127852363231793215>",
        },
        {
          label: "Donate",
          description: "Xem các lệnh về donate",
          value: "donate",
          emoji: "<a:ICE_muiten:1021012134274011166>",
        },
      ])
  );

  const initialMessage = await message.channel.send({
    embeds: [embed],
    components: [select],
  });

  const filter = (interaction) => interaction.customId === "help" && interaction.user.id === message.author.id;
  const collector = initialMessage.createMessageComponentCollector({
    filter,
    componentType: ComponentType.StringSelect,
    time: 60000,
  });

  collector.on("collect", async (collected) => {
    let value = collected.values[0];
    let embeds = [embed];

    if (value === "giveaway") embeds = [giveaway];
    else if (value === "general") embeds = [general];
    else if (value === "image") embeds = [image];
    else if (value === "fun") embeds = [fun];
    else if (value === "image2") embeds = [image2];
    else if (value === "res") embeds = [res];
    else if (value === "donate") embeds = [donate];

    await collected.update({ embeds, components: [select] });
  });

  collector.on("end", () => {
    select.components[0].setDisabled(true);
    initialMessage.edit({ components: [select] });
  });
}

}
