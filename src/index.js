const commander = require('commander')
const { Config, globalConfig } = require('./config-manager')
const Logger = require('./logger')
const log = Logger.Logger('CLI')
const constant = require('./constant')
const telegramMessage = require('./message/telegram.message')
const discordMessage = require('./message/discord.message')
const executeMessage = require('./execute-message')
const Store = require('./store')
globalConfig.init('./config/global.config.js')

const program = new commander.Command()
program
    .command('run')
    .description('Run a bot')
    .option('--telegram', 'run with `telegram` transport')
    .option('--discord', 'run with `discord` transport')
    .action(async (option) => {
        if (!option.telegram && !option.discord) {
            log.error('specify transport')
        }
        const executions = []
        if (option.telegram) {
            const telegramExecute = async () => {
                const configInstance = Config()
                configInstance.init(constant.TELEGRAM_CONFIG_PATH)
                const logger = Logger.createLogger('telegram')
                const store = new Store(constant.TELEGRAM_DATA_PATH)
                const telegram = new telegramMessage(configInstance.config)
                await executeMessage(telegram, logger, store)
            }
            executions.push(
                telegramExecute().catch((e) =>
                    log.fatal('telegram execution fail', e)
                )
            )
        }
        if (option.discord) {
            const discordExecute = async () => {
                const configInstance = Config()
                configInstance.init(constant.DISCORD_CONFIG_PATH)
                const logger = Logger.createLogger('discord')
                const store = new Store(constant.DISCORD_DATA_PATH)
                const discord = new discordMessage(configInstance.config)
                await executeMessage(discord, logger, store)
            }
            executions.push(
                discordExecute().catch((e) =>
                    log.fatal('discord execution fail', e)
                )
            )
        }
        await Promise.allSettled(executions)
    })

program.parse()
