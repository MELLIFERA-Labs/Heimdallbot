const path = require('path')

function configSampleByConfigName(configName) {
    const arr = configName.split('.')
    arr.splice(2, 0, 'sample')
    return arr.join('.')
}

function checkConfigKeys(config, configSample) {
    const configKeys = Object.keys(config)
    Object.entries(configSample)
        .map(([key, value]) => (value ? key : null))
        .filter(Boolean)
        .forEach((sampleKey) => {
            if (!configKeys.includes(sampleKey)) {
                throw new Error(`Missed \`${sampleKey}\` in config`)
            }
        })
}

// 'discord.config.sample.js'.split('.').filter(it => i!='sample')
function Config() {
    let config = null
    return {
        init: (configPath) => {
            if (config) return
            if (!configPath) throw new Error('config path should be specified')
            let configSample = {}
            try {
                config = require(path.resolve(process.cwd(), configPath))
                const configSampleName = configSampleByConfigName(
                    configPath.split('/').at(-1)
                )
                configSample = require(path.resolve(
                    process.cwd(),
                    'config',
                    configSampleName
                ))
            } catch (e) {
                throw new Error('Error to load config')
            }
            checkConfigKeys(config, configSample)
            // config = require(path.resolve(process.cwd(), 'config.js'))
            // checkConfigKeys(config)
        },
        get config() {
            if (!config)
                throw new Error('Need to call method `init` method first!')
            return config
        },
    }
}

module.exports = {
    globalConfig: Config(),
    Config,
}
