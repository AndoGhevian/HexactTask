#!/usr/bin/env node

const Table = require('cli-table')

const getResourceMap = require('./getResourceMap')


const [
    , ,
    website = 'http:/localhost:8000',
] = process.argv

runIt(website)


async function runIt(website) {
    const urlCodeMap = await getResourceMap(website)
    console.log('aaaaaaaa')
    const codeCountMap = new Map()


    const urlCodeTable = new Table({
        head: ['URL', 'Status Code'],
        colWidths: [60, 13],
    })
    const codeCountTable = new Table({
        head: ['Status Code', 'Count'],
        colWidths: [13, 10],
    })

    
    for (const urlCodePair of urlCodeMap) {
        urlCodeTable.push(urlCodePair)

        const code = urlCodePair[1]
        if (!codeCountMap.has(code)) codeCountMap.set(code, 0)
        const count = codeCountMap.get(code)

        codeCountMap.set(code, count + 1)
    }

    for(const codeCountPair of codeCountMap) {
        codeCountTable.push(codeCountPair)
    }

    console.log(urlCodeTable.toString())
    console.log(codeCountTable.toString())
}