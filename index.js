const fs = require('fs');
const express = require('express')
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('et!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
const { Util, Collection, MessageEmbed, Structures } = require("discord.js");
const Client = require("./src/structures/Client");
const client = new Client();
const config = require("./src/assets/json/config.json");

["command", "event", "functions"].forEach((handler) => {
  require(`./src/handlers/${handler}`)(client);
});
process.on('unhandledRejection', (reason, p) => {
  console.error(reason.stack);
})

fs.readdir("./src/events/giveaways", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./src/events/giveaways/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   🎉 Loaded: ${eventName}`);
    client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client)), delete require.cache[require.resolve(`./src/events/giveaways/${file}`)];
  })
})

client.start(process.env.TOKEN);

