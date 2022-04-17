const { getProposals } = require('./propsals-api')
const constant = require('./constant')
function createMessageFromProposal(proposal) {
    return `New proposal #${proposal.proposal_id}\n\n***${
        proposal.content.title
    }***\n\n${proposal.content.description}\n\nStart: ${
        proposal.voting_start_time.split('T')[0]
    }\nEnd:  ${proposal.voting_end_time.split('T')[0]} \n\nTo vote: ${
        constant.TO_VOTE_PROPOSAL_URL
    }${proposal.proposal_id}`
}

async function executeMessage(transport, log, store) {
    log.info('Start')
    const proposals = await getProposals()
    const propData = store.read()

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
            // sender.send(content)
            await transport.send(createMessageFromProposal(prop))
            log.info(
                'successfully notified! proposal number:',
                prop.proposal_id
            )
        }
        const lastProp = actualProposals.sort(
            (a, b) => b.proposal_id - a.proposal_id
        )[0]
        store.save({ last_notified_proposal_id: Number(lastProp.proposal_id) })
        log.info(
            'successfully state updated! proposal number changed:',
            lastProp.proposal_id
        )
    }
    log.info('End')
}
module.exports = executeMessage
