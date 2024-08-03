const fs = require("fs");
const { join } = require("path");
const { table, getBorderCharacters } = require("table");

let data = [["Event name", "Status"]];
const config = {
  border: getBorderCharacters("norc"),
  header: {
    alignment: "center",
    content: "Events",
  },
};

module.exports = async (client, dir = "events") => {
  const chalk = (await import('chalk')).default;
  let count = 0;
  const files = fs.readdirSync(join(__dirname, "..", dir));
  for (const file of files) {
    if (file.endsWith(".js")) {
      const eventName = file.substring(0, file.indexOf(".js"));
      try {
        const eventModule = require(join(__dirname, "..", dir, file));
        client.on(eventName, eventModule.bind(null, client));
        count++;
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#4DFDBB")("loaded ✅"),
        ]);
      } catch (err) {
        console.error(err);
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#FD4D50")(`error ❌`),
        ]);
        continue;
      }
    }
  }
  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${count} events loaded`));
};
