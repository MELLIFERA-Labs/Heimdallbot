![code_quality_score](https://api.codiga.io/project/33110/score/svg)![node](https://img.shields.io/badge/node-%3E=16.13.2-green)![License](https://img.shields.io/github/license/MELLIFERA-Labs/Heimdallbot)

# Heimdallbot
Bot for notifications about new proposals in Cosmos

<img src="heimdall.png" width="30%">

[Odin protocol](https://odinprotocol.io/):

Telegram: https://t.me/ODINproposals

Discord: https://discord.gg/cUXKyRq

[Kyve network](https://kyve.network/) testnet: 

Telegram: https://t.me/KyveProposals

## How to run a bot

requirements:
``` 
node.js >=16.14.2
```

### Install dependencies

```
npm install
```
### Set up storage with command
```
npm run setup  
```
### Set up configs.

Before run, store a `global.config.js` file in the project config folder. The config sample can be find in config folder `global.config.sample.js`
- SET `telegram` config.
If you want to run message via telegram transport, create  `telegram.config.js` in `config/` folder. Sample is `telegram.config.sample.js`
- SET `discord` config. If you want to run message via discord transport, create  `discord.config.js` in `config/` folder. Sample is `discord.config.sample.js`
- SET both config if you want to run `discord` and `telegram`


### RUN with cron:

example with 2 transports:
```
  */30 * * * * cd /user/Heimdallbot && npm start --silent -- --telegram --discord  >> /user/heimdallbot.log
```
example with 1 transports:
```
  */30 * * * * cd /user/Heimdallbot && npm start --silent -- --telegram >> /user/heimdallbot.log
```

if use `nvm` do alias 

```
sudo ln -s "$(which node)" /usr/bin/node
sudo ln -s "$(which npm)" /usr/bin/npm
```
[cron examples](https://crontab.guru/examples.html)


## Contributing

To contribute to this repository please follow these steps:

1. Clone the repository
2. Install dependencies
    ```
    npm install
    ```
3. Before committing make linter check:
    ```
     npm run format:check & npm run lint:check
    ```
