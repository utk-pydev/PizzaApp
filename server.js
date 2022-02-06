const expr = require('express')
const app = expr()

const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

const path = require('path')

const PORT = process.env.PORT || 3300;

app.use(expr.static('public'))

app.get('/', (req, res)=>{
    res.render('home')
})

app.use(expressLayout)
app.set('views', path.join(__dirname,  '/resources/views'))
app.set('view engine', 'ejs')


app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})