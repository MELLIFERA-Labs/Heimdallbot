const MessageAbstract = require('./message.abstract')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

class DiscordMessage extends MessageAbstract {
    constructor(config) {
        super()
        this.config = config
        this.rest = new REST({ version: '9' }).setToken(config.BOT_TOKEN)
    }
    async send(content) {
        await this.rest.post(Routes.channelMessages(this.config.CHAT_ID), {
            body: { content: '> ' + content },
        })
    }
}
module.exports = DiscordMessage
