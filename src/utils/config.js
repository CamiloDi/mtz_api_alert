
const { ServerApiVersion } = require('mongodb');
const emoji = require('node-emoji')

const mongoConfig = {
    host: process.env.HOSTDB.toString().replace('$CREDENTIALS$', `${process.env.USERDB}:${process.env.PASSWORDDB}`),
    database: process.env.NAMEDB,
    collection: process.env.COLLECTION_NAME,
    mongoOptions: {
        useUnifiedTopology: true, useNewUrlParser: true,
        connectTimeoutMS: 30000, serverApi: ServerApiVersion.v1
    }
}
const constants = {
    TIMEZONE: process.env.TIMEZONE,
};
const activeLogs = JSON.parse(process.env.LOGS);

const messageTelegram = `${emoji.get('scream')} moment-timezone (${process.env.TIMEZONE}) had update!!!`;
const botTelegramConfig = {
    botId: process.env.BOT_ID,
    botToken: process.env.BOT_TOKEN,
    botGroup: process.env.BOT_GROUP
};

module.exports = { mongoConfig, constants, activeLogs, messageTelegram, botTelegramConfig };