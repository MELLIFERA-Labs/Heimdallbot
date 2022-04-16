const fs = require('fs')
const constant = require('./constant')
const discordData = fs.existsSync(constant.DISCORD_DATA_PATH)
if (!discordData) {
    fs.writeFileSync(
        constant.DISCORD_DATA_PATH,
        JSON.stringify({ last_notified_proposal_id: 0 })
    )
}

const telegramData = fs.existsSync(constant.TELEGRAM_DATA_PATH)
if (!telegramData) {
    fs.writeFileSync(
        constant.TELEGRAM_DATA_PATH,
        JSON.stringify({ last_notified_proposal_id: 0 })
    )
}
