const random = require("random-number-csprng");

module.exports = async (client) => {
  const chalk = (await import('chalk')).default;

  // Calculate the total number of users across all guilds
  const totalUsers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
  let botStatus = [`${client.func.laysodep(totalUsers)} user`];

  // Set a new activity every 5 seconds
  setInterval(() => {
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(status, { type: "STREAMING", url: "discord.gg/icezfamily" });
  }, 5000);

  // Set the bot's status to "online"
  client.user.setStatus("online");

  // Log the bot's startup message
  console.log(
    chalk.hex("#E5C3FF")(
      `${client.user.tag} has started, with ${totalUsers} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
    )
  );
};
