
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

RUN with cron:

example:
```
  */30 * * * * cd /user/Haimdallbot && npm run run:tlg --silent >> /user/haimdallbot.log
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
