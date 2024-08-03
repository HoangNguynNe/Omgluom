const { readdirSync, existsSync } = require("fs");
const { table, getBorderCharacters } = require("table");

const data = [["Function name", "Status"]];
const config = {
  border: getBorderCharacters("norc"),
  header: {
    alignment: "center",
    content: "Functions",
  },
};

module.exports = async (client) => {
  const chalk = (await import('chalk')).default;
  let count = 0;

  const functionsDir = '/root/hnguyndo/src/functions/';

  if (!existsSync(functionsDir)) {
    console.error(`Functions directory not found: ${functionsDir}`);
    return;
  }

  const functions = readdirSync(functionsDir).filter(file =>
    file.endsWith(".js")
  );

  for (const file of functions) {
    const filePath = `${functionsDir}/${file}`;
    try {
      delete require.cache[require.resolve(filePath)];
      const pull = require(filePath)(client);
      count++;
      data.push([
        chalk.hex("#E5C3FF")(file),
        chalk.hex("#4DFDBB")("loaded ✅"),
      ]);
    } catch (err) {
      console.error(`Error loading function ${file}:`, err);
      data.push([
        chalk.hex("#E5C3FF")(file),
        chalk.hex("#FD4D50")(`error ❌`),
      ]);
    }
  }

  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${count} functions loaded`));
};

