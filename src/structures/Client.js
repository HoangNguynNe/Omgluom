const { Client, Collection, Intents, GatewayIntentBits, Partials } = require("discord.js");
const config = require("../assets/json/config.json")
const { DiscordTogether } = require("discord-together");
const partner = require('./partner.js')
const donate = require('./donate.js')
const voicechat = require('./voicechat.js')
const GiveawayManagerWithOwnDatabase = require("./Giveaway.js")
const AutoResponder = require('discord-autoresponder');


module.exports = class extends Client {
  constructor(config) {
    super({
      allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.MessageContent,
      ],
      partials: [
        Partials.Channel, // Để xử lý các tin nhắn partial
        Partials.Message, // Để xử lý các tin nhắn partial
        Partials.Reaction, // Nếu cần xử lý phản ứng của tin nhắn
      ],
    });
    this.commands = new Collection();
    this.aliases = new Collection();
    this.emoji = require("../assets/json/emojis.json");
    this.config = require("../assets/json/config.json");
    this.snipes = new Collection();
    this.func = require("../util/util.js");
    this.partner = new partner();
    this.donate = new donate();
    this.voicechat = new voicechat();
    this.responder = new AutoResponder(this);
    this.discordTogether = new DiscordTogether(this);
    this.xoso = false
    const manager = new GiveawayManagerWithOwnDatabase(this, {
      default: {
        botsCanWin: false,
        embedColor:this.config.botcolor,
        embedColorEnd: '#2f3136',
        reaction: '<a:ICE_Giveaway:952182411129671771>'
      }
    });
    this.giveawaysManager = manager;
  }
  
  start(token) {
    process.on("unhandledRejection", (reason, p) => {
      console.log(`unhandledRejection: ${reason}`, p);
    });
    this.login(token);
  }
};
