const { MessageEmbed } = require("discord.js");

async function Donate(client, message) {
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    if(oldMessage.channel.id == '904285677133389874'){
      if(newMessage.author.id != '408785106942164992') return;
        msg = newMessage.content;
        userdn = newMessage.content;
        checktn = newMessage.content;
        const str = msg
        .replace(/\*\*💳 \| <@\d+>\*\* sent \*\*/, '') // Loại bỏ phần '**💳 | <@ID1>** sent **'
        .replace(/ cowoncy\*\* to \*\*<@851729163047272450>\*\*!/, '') // Loại bỏ phần ' cowoncy** to **<@705625464093409321>**!'
        .replace(/\s+/g, '') // Loại bỏ tất cả các khoảng trắng
        .replace(/,/g, ''); // Loại bỏ dấu phẩy nếu có

        const cash = parseInt(str)

        const userID = checktn.match(/<@(\d+)>/g)?.find(id => id.includes('851729163047272450'));
        const strne = userID ? userID.replace(/<@|>/g, '') : 'not found';

        if(strne == 'not found' && strne != '851729163047272450') return;

        if(userdn == strne) return;

        if(isNaN(cash)) return;

        const id1Match = userdn.match(/\*\*💳 \| <@(\d+)>\*\*/);
        const id1 = id1Match ? id1Match[1] : '';

        const channel = await client.channels.fetch("928919053798633513");

        const sotien = cash.toLocaleString('vi-VN');

        var donate = [
          `<a:ICE_heart:930000437577388082> Cảm ơn bạn <@${id1}> đã đôn cho <:ICE_svl:1263384196802678844> ${sotien} <a:ICE_owo:920276483640016897> nhé :3`,
          `<a:ICE_tim2trai:1137002345197223968> Waoooo <@${id1}> vừa donate ${sotien} <a:ICE_owo:920276483640016897> lận :3 `,
          `<a:ICE_animetimmm:952183392626176030> Cậu <@${id1}> vừa donate cho server ${sotien} <a:ICE_owo:920276483640016897> ne`,
          `<a:ICE_tim2trai:1137002345197223968> Cảm ơn <@${id1}> vừa donate ${sotien} <a:ICE_owo:920276483640016897> nha :3 `,
          `<a:ICE_Banking:1130351488070324364> Sao <@${id1}> dthw zay :3 Cảm ơn cậu đã donate ${sotien} <a:ICE_owo:920276483640016897> nha :3`,
          `<a:ICE_ebekhoc:1134405199419682886> ICE Home cảm động rớt nước mắt vì <@${id1}> đã donate ${sotien} <a:ICE_owo:920276483640016897>`,
          `<a:ICE_gaukiss:1012195322270863481> Cute nhất trái đất gọi tên <@${id1}> :3 Cảm ơn cậu đã donate ${sotien} <a:ICE_owo:920276483640016897> nha :3`
        ];

        if(client.donate.addDonate(id1, cash)){
          channel.send(donate[Math.floor(Math.random() * donate.length)]);
        }
    }
  });
}
module.exports = Donate;