const cheerio = require('cheerio')


const retriveLinks = (html) => {
    try {
        const $ = cheerio.load(html)

        return Array.from(new Set(
            $('area[href], a[href], link[href]')
                .toArray()
                .filter(elem => elem.attribs.href)
                .map(elem => elem.attribs.href)
        ))
    } catch {
        return []
    }
}

module.exports = retriveLinks