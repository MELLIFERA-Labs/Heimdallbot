
# Heimdallbot
Bot for notifications about new Odin protocol proposals

<img src="heimdall.png" width="30%">

Telegram: https://t.me/ODINproposals


## How to run a bot

requirements:
``` 
node.js >=16.14.2
```


Install dependencies

`npm install`

Before run, store a `config.js` file in the project folder. The config sample can be find in `config.sample.js`

AND 

Add to data folder `telegram.json` file with default params `{ "last_notified_proposal_id": 0 }`

RUN with cron:

example:
```
  */30 * * * * cd /user/Heimdallbot && npm run run:tlg --silent >> /user/heimdallbot.log
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
