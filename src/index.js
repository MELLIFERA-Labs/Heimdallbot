const { Bot } = require('grammy')
const configManager = require('./config-manager')
configManager.init()
const { getProposals } = require('./propsals-api')
const fs = require('fs')
const log = require('./logger').Logger('telegram')
const bot = new Bot(configManager.config.BOT_TOKEN)

function createMessageFromProposal(proposal) {
    return `New proposal #${proposal.proposal_id}\n\n***${
        proposal.content.title
    }***\n\n${proposal.content.description}\n\nStart: ${
        proposal.voting_start_time.split('T')[0]
    }\nEnd:  ${
        proposal.voting_end_time.split('T')[0]
    } \n\nTo vote: https://mainnet.odinprotocol.io/proposal/${
        proposal.proposal_id
    }`
}

async function main() {
    log.info('Start')
    const proposals = await getProposals()
    const propData = JSON.parse(
        fs.readFileSync('./data/telegram.json', 'utf-8')
    )

    const actualProposals = proposals
        .filter(
            (proposal) => proposal.status === 'PROPOSAL_STATUS_VOTING_PERIOD'
        )
        .filter(
            (prop) =>
                Number(prop.proposal_id) > propData['last_notified_proposal_id']
        )

    if (actualProposals.length) {
        for (const prop of actualProposals) {
            await bot.api.sendMessage(
                configManager.config.CHAT_ID,
                createMessageFromProposal(prop),
                {
                    parse_mode: 'Markdown',
                }
            )
            log.info(
                'successfully notified! proposal number:',
                prop.proposal_id
            )
        }
        const lastProp = actualProposals.sort(
            (a, b) => b.proposal_id - a.proposal_id
        )[0]
        fs.writeFileSync(
            './data/telegram.json',
            JSON.stringify({
                last_notified_proposal_id: Number(lastProp.proposal_id),
            })
        )
        log.info(
            'successfully state updated! proposal number changed:',
            lastProp.proposal_id
        )
    }
    log.info('End')
}

main().catch(log.fatal)
