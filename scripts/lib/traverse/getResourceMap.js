const {
    getResource,
    urlToNormObj,
} = require('../utils')


module.exports = getResourceMap

async function getResourceMap(website) {
    const normWebsiteObj = urlToNormObj(website)

    if (!normWebsiteObj) throw new Error(`Invalid Website: ${website} Provided`)

    const urlToCodeMap = new Map()
    await getResource(normWebsiteObj, normWebsiteObj.site, urlToCodeMap)
    return urlToCodeMap
}