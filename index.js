var exp = require('express')
var app = exp()


const PORT = process.env.PORT || 3000

app.get('/', (reg, res) => {
    console.log('Book review')
    res.send('<h1>Hello book review</h1>')
})

app.listen(PORT, () => {
    console.log(`Àpp running in port ${PORT}`)
})