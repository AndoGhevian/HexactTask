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

// // Testing retriveLinks()
// const links = retriveLinks(
//     `
//     <a></a>
//     <link href=''></link>
//     <map name="infographic">
//     <area shape="rect" coords="184,6,253,27"
//           href="https://mozilla.org"
//           target="_blank" alt="Mozilla" />
//     <area shape="circle" coords="130,136,60"
//           href="https://developer.mozilla.org/"
//           target="_blank" alt="MDN" />
//     <area shape="poly" coords="130,6,253,96,223,106,130,39"
//           href="https://developer.mozilla.org/docs/Web/Guide/Graphics"
//           target="_blank" alt="Graphics" />
//     <area shape="poly" coords="253,96,207,241,189,217,223,103"
//           href="https://developer.mozilla.org/docs/Web/HTML"
//           target="_blank" alt="HTML" />
//     <area shape="poly" coords="207,241,54,241,72,217,189,217"
//           href="https://developer.mozilla.org/docs/Web/JavaScript"
//           target="_blank" alt="JavaScript" />
//     <area shape="poly" coords="54,241,6,97,36,107,72,217"
//           href="https://developer.mozilla.org/docs/Web/API"
//           target="_blank" alt="Web APIs" />
//     <area shape="poly" coords="6,97,130,6,130,39,36,107"
//           href="https://developer.mozilla.org/docs/Web/CSS"
//           target="_blank" alt="CSS" />
//     <area shape="rect" coords="184,6,253,27"
//     href=""
//     target="_blank" alt="Mozilla" />
// </map>
// <img usemap="#infographic" src="/media/examples/mdn-info.png" alt="MDN infographic" />

//     `
// )

// console.log(links)