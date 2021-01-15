const express = require('express')
const app = express()
const { v4: uuidv4} = require('uuid')
uuidv4()


app.get('/', (req, res) => {
    console.log(uuidv4())
    res.send("Hello world !")
})

app.listen(8081)
