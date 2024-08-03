async function Voice(client) {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        // Kiểm tra nếu guild ID là '889331496542957658'
        if (newState.guild.id === '889331496542957658') {
            // Gọi phương thức xử lý voice trong client.voicechat
            if (client.voicechat && typeof client.voicechat.voice === 'function') {
                await client.voicechat.voice(client, oldState, newState);
            } else {
                console.error('Phương thức voice không tồn tại trong client.voicechat');
            }
        }
    });
}

module.exports = Voice;
