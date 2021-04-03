const path = require('path')

const express = require('express')

const PORT = 8000
const ORIGIN = `http://localhost:${PORT}`

const app = express()

app.use(express.static(path.resolve(__dirname, './layout')))
app.get('/', (_, res) => {
    res.send(`
    <link rel="stylesheet" href="/styles.css">
    <h1 name="H1">Fragment Identifier #H1</h1>
    <div>
        <a href="#H1">#H1</a>
        <a href="/blog">/blog</a>
        <a href="/blog#H1">/blog#H1</a>
        <a href="https://github.com/AndoGhevian/CustomNumberSystem">https://github.com/AndoGhevian/CustomNumberSystem</a>
        <a href="http://yandex.ru">http://yandex.ru -> redirect to -> https://yandex.ru</a>
        
        <a href="${ORIGIN}/query">${ORIGIN}/query</a>
        <a href="/query">/query</a>
        <a href="/query?param1=p1&param2=p2">/query?param1=p1&param2=p2</a>
        <a href="/query?param2=p1&param1=p2">/query?param2=p1&param1=p2</a>

        <a href="/redirect">/redirect</a>

        <a href="/recursive-redirect">/recursive-redirect</a>
    </div>
    `)
})


app.get('/blog', (_, res) => {
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <h1 name="H1">Fragment Identifier #H1</h1>
        <a href="${ORIGIN}/about">${ORIGIN}/about</a>
    `)
})

app.get('/about', (_, res) => {
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <a href="/about">/about</a>
        <a href="${ORIGIN}/blog">${ORIGIN}/blog</a>
    `)
})

app.get('/query', (_, res) => {
    res.send('/query')
})

app.get('/redirect', (_, res) => {
    res.redirect('/from-redirect')
})

app.get('/from-redirect', (_, res) => {
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <a href="/multy-redirect-2">/multy-redirect-2</a>
    `)
})

app.get('/multy-redirect-2', (_, res) => {
    res.redirect('/multy-redirect-1')
})
app.get('/multy-redirect-1', (_, res) => {
    res.redirect('/multy-redirect-0')
})
app.get('/multy-redirect-0', (_, res) => {
    res.send(`
        <link rel="stylesheet" href="/styles.css">
        <a href="/">home</a>
    `)
})

app.get('/recursive-redirect', (_, res) => {
    res.redirect('/recursive-redirect')
})

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`Server started http://localhost:${PORT}`)
})