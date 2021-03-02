const express = require('express')
const app = express()
const port = 8081
const { v4: uuidv4} = require('uuid')
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send("Hello world ! ").status(200).end()
})

/**
 * Récupération d'un utilisateur
 */
app.get('/user/:id', ((req, res) => {
    const User = require('./models/user')

    const id = req.params.id
    const user = User.getUserById(id)

    console.log(user)
    if(user != undefined){
        res.send(user).status(200)
        console.log(user)
    } else {
        console.log(res.status(404).end)
    }
}))

/**
 * Création d'un nouvel utilisateur
 */
app.post('/newuser', (req, res) => {
    let User = require('./models/user')

    let nom = req.body.nom
    let prenom = req.body.prenom
    let email = req.body.email
    let mdp = req.body.mdp
    User.createUser(nom, prenom, email, mdp)

    res.json(req.body).status(200)
})

app.listen(port, function (){
    console.log("Server running on port " + port)
})
