const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('et!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const { Util, Collection, MessageEmbed, Structures } = require("discord.js");
const Client = require("/root/hnguyndo/src/structures/Client");
const client = new Client();
const config = require("/root/hnguyndo/src/assets/json/config.json");

["command", "event", "functions"].forEach((handler) => {
  require(`/root/hnguyndo/src/handlers/${handler}`)(client);
});

process.on('unhandledRejection', (reason, p) => {
  console.error(reason.stack);
});

fs.readdir("/root/hnguyndo/src/events/giveaways", (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`/root/hnguyndo/src/events/giveaways/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   🎉 Loaded: ${eventName}`);
    client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client));
    delete require.cache[require.resolve(`/root/hnguyndo/src/events/giveaways/${file}`)];
  });
});


client.start("OTYyNDg5NDI1MzQ1MDE5OTM0.G5QuwL.FY563hTcoQLnJ_FNPs117hLZDIRVG4Bgt3opvk");

