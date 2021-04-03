let got = require('got').default; got = require('got')

const {
    urlToNormObj,
    retriveLinks,
} = require('./utils')


module.exports = getResourceMap

async function getResourceMap(website) {
    const normWebsiteObj = urlToNormObj(website)

    if (!normWebsiteObj) throw new Error(`Invalid Website: ${website} Provided`)

    const urlToCodeMap = new Map()
    await getResource(normWebsiteObj, normWebsiteObj.site, urlToCodeMap)
    return urlToCodeMap
}



async function getResource(urlNormObj, site, map) {
    if (!urlNormObj || !site || !map) throw new Error('Required Arguments: urlNormObj, site, map')
    if (map.has(urlNormObj.url)) return map

    try {
        let outOfSite = urlNormObj.site !== site
        let redirectionInterrupted = false
        const response = await got(urlNormObj.url, {
            throwHttpErrors: false,
            hooks: {
                beforeRedirect: [
                    async (options, response) => {
                        map.set(response.url, response.statusCode)

                        if (map.has(options.url.href)) {
                            return redirectionInterrupted = true
                        }

                        if (outOfSite) {
                            options.followRedirect = false
                            return redirectionInterrupted = true
                        }

                        const {
                            origin: responseOrigin,
                        } = urlToNormObj(response.url)
                        const normLocationObj = urlToNormObj(options.url.href, responseOrigin)
                        if (!normLocationObj) {
                            options.followRedirect = false
                            return redirectionInterrupted = true
                        }

                        options.url = new URL(normLocationObj.url)
                        if (normLocationObj.site !== site) return outOfSite = true
                    }
                ]
            }
        })

        if (redirectionInterrupted) return map

        if (outOfSite) {
            return map.set(response.url, response.statusCode)
        }

        map.set(response.url, response.statusCode)

        /**
         * Excluding mimtypes that are not parsable via html parsers,
         * considering case when mimeType has parameters.
         */
        const lowerMimeType = (response.headers['content-type'] ?? '').toLowerCase()
        if (
            lowerMimeType !== 'text/html' &&
            lowerMimeType !== 'application/xhtml+xml' &&
            !lowerMimeType.startsWith('text/html;') &&
            !lowerMimeType.startsWith('application/xhtml+xml;')
        ) {
            return map
        }

        /**
         * From MDN:
         * > XHTML is a term that was historically used to describe HTML 
         * documents written to conform with XML syntax rules.
         * 
         * NOTE: This can cause a variety of sometimes-very-surprising problems.
         * Details see at the bottom of the document -
         * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/XHTML#xhtml_document
         */
        const links = retriveLinks(response.rawBody)
        const {
            origin: responseOrigin,
        } = urlToNormObj(response.url)
        await Promise.all(
            links.map(link => {
                const normLinkObj = urlToNormObj(link, responseOrigin)

                if (!normLinkObj) return map
                return getResource(normLinkObj, site, map)
            })
        )

        return map
    } catch {
        return map
    }
}