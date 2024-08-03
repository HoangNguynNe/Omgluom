// utils/emojiUtils.js
const parseEmoji = (emoji) => {
    const regex = /<a?:\w+:(\d+)>/;
    const match = emoji.match(regex);
    if (match) {
      return {
        id: match[1],
        animated: emoji.startsWith('<a:'),
      };
    }
    return null;
  };
  
  module.exports = { parseEmoji };
  