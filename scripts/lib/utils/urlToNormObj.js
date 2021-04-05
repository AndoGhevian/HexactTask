const psl = require('psl')


const urlToNormObj = (url, base) => {
    try {
        const normObj = {
            url: '',
            site: '',
            hostname: '',
            origin: '',
            localhost: false,
        }

        const obj = new URL(url, base)
        obj.hash = ''

        if (!obj.origin || obj.origin === 'null') return null

        if (obj.hostname === 'localhost') {
            normObj.site = 'localhost'
            normObj.localhost = true
        } else {
            const site = psl.get(obj.hostname)

            if (!site) return null

            normObj.site = site
            normObj.localhost = false
        }


        const sortedQueryString = Array.from(obj.searchParams)
            .sort((a, b) => {
                if (a[0] > b[0]) return -1
                if (a[0] < b[0]) return 1
                if (a[0] === b[0]) {
                    if (a[1] < b[1]) return -1
                    if (a[1] > b[1]) return 1
                    return 0
                }
            })
            .reduce((queryString, param) =>
                queryString + `${param[0]}=${param[1]}`, ''
            )
        obj.search = sortedQueryString
        normObj.url = obj.href
        normObj.hostname = obj.hostname
        normObj.origin = obj.origin

        return normObj
    } catch {
        return null
    }
}

// const normObj = urlToNormObj('http://www.yandex.uk.com:8000?a=!!~10')
// console.log(normObj)

module.exports = urlToNormObj