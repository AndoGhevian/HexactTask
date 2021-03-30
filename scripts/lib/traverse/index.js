#!/usr/bin/env node

let axios = require('axios').default; axios = require('axios')
const cheerio = require('cheerio')


const [
    , ,
    site = 'http://localhost:8000',
] = process.argv

const runIt = async () => {
    const home = await axios.get(site, {
        
    })
    console.log(home.data)
    // const $ = cheerio.load()
}

runIt()