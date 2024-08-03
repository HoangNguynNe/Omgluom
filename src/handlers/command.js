const { readdirSync, existsSync } = require("fs");
const { table, getBorderCharacters } = require("table");

const data = [["Command name", "Status"]];
const config = {
  border: getBorderCharacters("norc"),
  header: {
    alignment: "center",
    content: "Commands",
  },
};

module.exports = async (client) => {
  const chalk = (await import('chalk')).default;
  let count = 0;

  const commandsDir = "/root/hnguyndo/src/commands/";

  if (!existsSync(commandsDir)) {
    console.error(`Commands directory not found: ${commandsDir}`);
    return;
  }

  readdirSync(commandsDir).forEach((dir) => {
    const dirPath = `${commandsDir}/${dir}`;
    if (!existsSync(dirPath)) {
      console.error(`Subdirectory not found: ${dirPath}`);
      return;
    }

    const commands = readdirSync(dirPath).filter((file) =>
      file.endsWith(".js")
    );

    for (const file of commands) {
      const filePath = `${dirPath}/${file}`;
      try {
        delete require.cache[require.resolve(filePath)];
        const pull = require(filePath);
        if (pull.name) {
          count++;
          client.commands.set(pull.name, pull);
          data.push([
            chalk.hex("#E5C3FF")(file),
            chalk.hex("#4DFDBB")("loaded ✅"),
          ]);
        } else {
          data.push([
            chalk.hex("#E5C3FF")(file),
            chalk.hex("#FD4D50")(`error ❌`),
          ]);
        }
        if (pull.aliases && Array.isArray(pull.aliases))
          pull.aliases.forEach((alias) => client.aliases.set(alias, pull.name));
      } catch (err) {
        console.error(`Error loading command ${file}:`, err);
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#FD4D50")(`error ❌`),
        ]);
      }
    }
  });

  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${count} commands loaded`));
};

