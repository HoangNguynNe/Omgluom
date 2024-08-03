const { EmbedBuilder } = require("discord.js");

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

        var donatenhieu = [
          `<a:ICE_heart:930000437577388082> Cảm ơn bạn <@${id1}> đã đôn cho <:ICE_svl:1263384196802678844> ${sotien} <a:ICE_owo:920276483640016897> nhé :3`,
          `<a:ICE_tim2trai:1137002345197223968> Waoooo <@${id1}> vừa donate ${sotien} <a:ICE_owo:920276483640016897> lận :3`,
          `<a:ICE_animetimmm:952183392626176030> Cậu <@${id1}> vừa donate cho server ${sotien} <a:ICE_owo:920276483640016897> ne`,
          `<a:ICE_tim2trai:1137002345197223968> Cảm ơn <@${id1}> vừa donate ${sotien} <a:ICE_owo:920276483640016897> nha :3`,
          `<a:ICE_Banking:1130351488070324364> Sao <@${id1}> dthw zay :3 Cảm ơn cậu đã donate ${sotien} <a:ICE_owo:920276483640016897> nha :3`,
          `<a:ICE_ebekhoc:1134405199419682886> ICE Home cảm động rớt nước mắt vì <@${id1}> đã donate ${sotien} <a:ICE_owo:920276483640016897>`,
          `<a:ICE_gaukiss:1012195322270863481> Cute nhất trái đất gọi tên <@${id1}> :3 Cảm ơn cậu đã donate ${sotien} <a:ICE_owo:920276483640016897> nha :3`,
          `<a:ICE_star:1264645375739340831> Wow, cậu <@${id1}> thật tuyệt vời với số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_gift:1264645375739340832> Rất cảm kích sự ủng hộ của cậu, <@${id1}>! ${sotien} <a:ICE_owo:920276483640016897> thật tuyệt!`,
          `<a:ICE_sparkles:1264645375739340833> Không thể tin nổi! <@${id1}> đã donate ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_clap:1264645375739340834> Xin cảm ơn <@${id1}> với ${sotien} <a:ICE_owo:920276483640016897>! Bạn thật tuyệt!`,
          `<a:ICE_thumbsup:1264645375739340835> ICE Home cám ơn <@${id1}> rất nhiều vì ${sotien} <a:ICE_owo:920276483640016897>`,
          `<a:ICE_happy:1264645375739340836> Thật tuyệt vời! <@${id1}> vừa donate ${sotien} <a:ICE_owo:920276483640016897> cho ICE Home!`,
          `<a:ICE_heart:1264645375739340837> Cảm ơn bạn <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_giftbox:1264645375739340838> Sự ủng hộ của bạn <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897> làm ICE Home rất vui!`,
          `<a:ICE_smile:1264645375739340839> Cảm ơn <@${id1}> vì đã donate ${sotien} <a:ICE_owo:920276483640016897> !`,
          `<a:ICE_cheer:1264645375739340840> ICE Home rất biết ơn sự đóng góp của <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_celebrate:1264645375739340841> Wow, thật là bất ngờ! <@${id1}> đã donate ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_gift2:1264645375739340842> Cảm ơn <@${id1}> rất nhiều vì sự ủng hộ với số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_happyheart:1264645375739340843> Sự ủng hộ của <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897> làm ICE Home rất vui mừng!`,
          `<a:ICE_joy:1264645375739340844> Cảm ơn <@${id1}> vì số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_love:1264645375739340845> ICE Home rất vui vì sự đóng góp của <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_party:1264645375739340846> Chúng tớ rất cảm ơn <@${id1}> vì đã donate ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_thankyou:1264645375739340847> Sự ủng hộ của <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897> làm ICE Home rất biết ơn!`,
          `<a:ICE_treasure:1264645375739340848> Cảm ơn <@${id1}> rất nhiều vì ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_valued:1264645375739340849> ICE Home rất cảm kích sự ủng hộ của <@${id1}> với ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_wonderful:1264645375739340850> Wow, <@${id1}> vừa donate ${sotien} <a:ICE_owo:920276483640016897> cho ICE Home!`,
          `<a:ICE_appreciate:1264645375739340851> Cảm ơn <@${id1}> vì sự ủng hộ tuyệt vời với số tiền ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_wow:1264645375739340852> Không thể tin nổi, <@${id1}> đã donate ${sotien} <a:ICE_owo:920276483640016897>!`,
          `<a:ICE_amazing:1264645375739340853> Sự ủng hộ của <@${id1}> với số tiền ${sotien} <a:ICE_owo:920276483640016897> làm ICE Home rất cảm kích!`,
          `<a:ICE_thanks:1264645375739340854> Cảm ơn <@${id1}> rất nhiều vì ${sotien} <a:ICE_owo:920276483640016897>!`
                ];    
            
                var donatesieunhieu = [
                  `<a:ICE_meocatnhay:1132868076786946099> ICE Z FAMILY rất là cảm ơn cậu đã donate chúng tớ ${sotien} <a:ICE_owo:920276483640016897> nha :3 \n<a:ICE_Giveaway4:1264652420533719150> Sự ủng hộ của cậu là niềm vinh hạnh rất lớn của chúng tớ :3`,
                  `<a:ICE_chattim:930002077386682378> Ỏ ICE Z FAMILY cảm ơn cậu nhiều khi đã donate ${sotien} <a:ICE_owo:920276483640016897> nha :3 \n Chúng tớ phát triển cũng một phần nhờ cậu đóa :3`,
                  `<a:ICE_chattim:930002077386682378> Cảm ơn cậu đã ủng hộ ${sotien} vào quỹ của ICE Z FAMILY, chúc cậu có một ngày vui vẻ`,
                  `<a:ICE_ebehunchutchut:962284822833799218> Iu cậu nhiều lắm khi đã donate chúng tớ ${sotien}, cảm ơn cậu rất nhiều :3`
                ];
                
                const alldonate = await client.donate.SumDonate(id1); // Đảm bảo sử dụng await khi gọi hàm bất đồng bộ
                const totalDonate = alldonate + cash;

                const guild = client.guilds.cache.get('889331496542957658'); // Thay thế bằng ID guild của bạn
                const member = guild.members.cache.get(id1);

                if (member) {
                    let roleId = null;
                    let messageContent = '';

                    // Xác định vai trò tương ứng với mốc cao nhất mà người dùng đã đạt được
                    if (totalDonate >= 10000000) {
                        roleId = '904278707366141952';
                        messageContent = `Chúc mừng <@${id1}>! Bạn đã đạt được donation 10000000 và nhận được role ${guild.roles.cache.get(roleId).name}.`;
                    } else if (totalDonate >= 5000000) {
                        roleId = '904279813374742559';
                        messageContent = `Chúc mừng <@${id1}>! Bạn đã đạt được donation 5000000 và nhận được role ${guild.roles.cache.get(roleId).name}.`;
                    } else if (totalDonate >= 3000000) {
                        roleId = '904279895977386027';
                        messageContent = `Chúc mừng <@${id1}>! Bạn đã đạt được donation 3000000 và nhận được role ${guild.roles.cache.get(roleId).name}.`;
                    } else if (totalDonate >= 1000000) {
                        roleId = '904279968484294716';
                        messageContent = `Chúc mừng <@${id1}>! Bạn đã đạt được donation 1000000 và nhận được role ${guild.roles.cache.get(roleId).name}.`;
                    } else if (totalDonate >= 500000) {
                        roleId = '904280080853897236';
                        messageContent = `Chúc mừng <@${id1}>! Bạn đã đạt được donation 500000 và nhận được role ${guild.roles.cache.get(roleId).name}.`;
                    }

                    // Thêm vai trò và gửi thông báo nếu có vai trò để thêm
                    if (roleId && !member.roles.cache.has(roleId)) {
                        const role = guild.roles.cache.get(roleId);
                        if (role) {
                            await member.roles.add(role);
                            // Gửi thông báo chúc mừng
                            await newMessage.channel.send(messageContent);
                        }
                    }
                }


          if (client.donate.addDonate(id1, cash)) {
            if (cash < 1000000) {
              channel.send(donatenhieu[Math.floor(Math.random() * donatenhieu.length)]);
             } else {
                const user = await client.users.fetch(id1);
                const embed = new EmbedBuilder()
                    .setTitle(`${user.username}#${user.discriminator}`)
                    .setDescription(donatesieunhieu[Math.floor(Math.random() * donatesieunhieu.length)])
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .setFooter({
                        text: 'FROM ICE Z FAMILY WITH LOVE',
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    });
    
                  channel.send({
                      content: `<@${id1}>`, // Tag the user
                      embeds: [embed]
                  });
            }
        }
    }
  });
}
module.exports = Donate;