const kakashi = require('anime-actions');
async function hug() {
  console.log(await kakashi.hug());
}

hug();