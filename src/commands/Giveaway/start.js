const ms = require('ms');

module.exports = {
  name: "start",
  aliases: ["ga"],
  category: "🎉 Giveaway",
  description: "Tạo GiveAway!",
  usage: "<PREFIX>startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]",
  run: async (client, message, args) => {
    // If the member doesn't have enough permissions
    if (!message.member.permissions.has('VIEW_CHANNEL') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return  message.reply(client.emoji.x + "**Bạn cần quyền **\`MANAGE_MESSAGES\`**để bắt đầu Giveaway!." + `\nSử dụng: **\`${client.config.PREFIX}start [Thời Gian] [Số người thắng] [Tiêu đề]\``);
    }

    // Giveaway channel
    let giveawayChannel = message.channel;
    // If no channel is mentionned

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
      return  message.reply(client.emoji.x + "** Vui Lòng Nhập Thời Gian Hợp Lệ!" + `\nSử dụng: **\`${client.config.PREFIX}start [Thời Gian] [Số người thắng] [Tiêu đề]\``);
    }

    // Number of winners
    let giveawayNumberWinners = args[1].replace(/w/g,"")
    // If the specified number of winners is not a number
    if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
      return  message.reply(client.emoji.x + "** Vui Lòng Nhập Số Người Win Hợp Lệ!" + `\nSử dụng: **\`${client.config.PREFIX}startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]\``);
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if (!giveawayPrize) {
      return  message.reply(client.emoji.x + "** Vui Lòng Nhập Tiêu Đề Để Bắt Đầu Giveaway.!" + `\nSử dụng: **\`${client.config.PREFIX}startgiveaway [Thời Gian] [Số người thắng] [Tiêu đề]\``);
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayNumberWinners),
      // Who hosts this giveaway
      hostedBy: true ? message.author : null,
      // Messages
      allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
      lastChance: {
        enabled: true,
        content: '<a:ICE_Giveaway4:1264652420533719150>**Cơ hội cuối để tham gia <a:ICE_Giveaway4:1264652420533719150>**',
        threshold: 5000,
        embedColor: '#FF0000'
      },
      messages: {
        giveaway: (client.config.everyoneMention ? "\n\n" : "") + "> <a:ICE_Giveaway:952182411129671771>・**Giveaway**・<a:ICE_Giveaway:952182411129671771>",
        giveawayEnded: (client.config.everyoneMention ? "\n\n" : "") + "<a:ICE_Giveaway:1129292607093223495>・**GIVEAWAY KẾT THÚC・<a:ICE_Giveaway:1129292607093223495>**",
        drawing: "<a:ICE_Clock:1130350460499402772> ・Thời gian còn lại: **{timestamp}**!",
        inviteToParticipate: "<a:ICE_muiten:1021012134274011166>・React <a:ICE_Giveaway:952182411129671771> Để Tham Gia!",
        winMessage: "Chúc Mừng, {winners}! Bạn Đã Nhận Được **{prize}**!",
        winMessage: {
          embed: {
            description: `[Đi tới giveaway]({this.messageURL})`,
          },
          content: `<a:ICE_babydance:930000087621468170>・Chúc mừng {winners}! đã trúng **{this.prize}** | Tổ chức bởi: {this.hostedBy}!`
        },
        embedFooter: "{this.winnerCount} winners",
        noWinner: "Giveaway bị hủy, không có người tham gia hợp lệ.",
        hostedBy: `<a:ICE_chattim:930002077386682378>・Tạo Bởi: {this.hostedBy}`,
        winners: "<a:ICE_partycat:930112649503584266> Winner(s)",
        endedAt: "Kết Thúc Lúc",
      }
    });
    try {
      message.delete()
    } catch { return; }
  }
};