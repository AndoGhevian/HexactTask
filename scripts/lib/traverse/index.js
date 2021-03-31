#!/usr/bin/env node

let axios = require('axios').default; axios = require('axios')
const cheerio = require('cheerio')


const [
    , ,
    site = 'http://a',
] = process.argv

runIt(site)


async function runIt(site) {
    // const home = await axios.get(site)
    // console.log(home.data)
    // const $ = cheerio.load()
}


const parseUrl = (url) => {
    const obj = new URL(url)
    const [
        
    ] = obj.hostname.split('.').reverse()
    console.log(obj.hostname)
    for(const val of )
}

parseUrl('https://測試.com')