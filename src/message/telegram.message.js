const MessageAbstract = require('./message.abstract')
const { Bot } = require('grammy')

class TelegramMessage extends MessageAbstract {
    constructor(config) {
        super()
        this.bot = new Bot(config.BOT_TOKEN)
        this.config = config
    }

    async send(content) {
        await this.bot.api.sendMessage(this.config.CHAT_ID, content, {
            parse_mode: 'Markdown',
        })
    }
}

module.exports = TelegramMessage
