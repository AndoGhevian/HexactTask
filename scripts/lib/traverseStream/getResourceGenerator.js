const {
    getResource,
    PingPong,
    urlToNormObj,
} = require('../utils')


module.exports = getResourceGenerator

async function* getResourceGenerator(website) {
    const normWebsiteObj = urlToNormObj(website)

    if (!normWebsiteObj) throw new Error(`Invalid Website: ${website} Provided`)

    const urlToCodeMap = new Map()
    const {
        ping,
        pong,
    } = new PingPong
    getResource(normWebsiteObj, normWebsiteObj.site, urlToCodeMap, ping)
        .then(map => ping(null), reason => ping(null))

    let urlInfo
    const urlSet = new Set()
    while (([urlInfo] = await pong()), urlInfo) {
        if(urlSet.has(urlInfo[0])) continue

        urlSet.add(urlInfo[0])
        yield urlInfo
    }
    
    urlSet.clear()
    return urlToCodeMap
}

// const runIt = async () => {
//     for await(const data of getResourceGenerator('http:/localhost:8000')) {
//         console.log(data)
//     }
// }

// runIt()