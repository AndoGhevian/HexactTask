#!/usr/bin/env node

const Table = require('cli-table')

const getResourceGenerator = require('./getResourceGenerator')


const [
    , ,
    website = 'http:/localhost:8000',
] = process.argv

runIt(website)

async function runIt(website) {
    const urlCodeGen = getResourceGenerator(website)
    const codeCountMap = new Map()


    const urlCodeTable = new Table({
        head: ['URL', 'Status Code'],
        colWidths: [60, 13],
    })
    const codeCountTable = new Table({
        head: ['Status Code', 'Count'],
        colWidths: [13, 10],
    })


    for await (const urlCodePair of urlCodeGen) {
        console.log(urlCodePair)
        urlCodeTable.push(urlCodePair)

        const code = urlCodePair[1]
        if (!codeCountMap.has(code)) codeCountMap.set(code, 0)
        const count = codeCountMap.get(code)

        codeCountMap.set(code, count + 1)
    }

    for (const codeCountPair of codeCountMap) {
        codeCountTable.push(codeCountPair)
    }

    console.log(urlCodeTable.toString())
    console.log(codeCountTable.toString())
}