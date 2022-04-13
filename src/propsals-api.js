const { config } = require('./config-manager')
const axios = require('axios')

async function getProposals() {
    const data = (await axios.get(config.PROPOSALS_API_REST_URL)).data
    return data.proposals
}

module.exports = {
    getProposals,
}
