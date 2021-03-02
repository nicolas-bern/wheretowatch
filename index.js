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
 * Récupération d'un utilisateur par un id
 */
app.get('/user/:id', ((req, res) => {
    let Userjs = require('./models/user')
    let id = req.params.id
    let User = new Userjs()

    User.getUserById(id)

    setTimeout(() => {
        console.log(User)
        if(User.idUser != undefined){
            res.send(User).status(200)
        } else {
            res.send("L'utilisateur " + id + " n'existe pas").status(404)
        }
    }, 300);



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


/**
 * Suppression d'un utilisateur
 */
app.delete('/deleteuser/:id', (req, res) => {
    let Userjs = require('./models/user')
    let id = req.params.id
    let User = new Userjs()

    User.getUserById(id)
    setTimeout(() => {
        console.log(User)
        if(User.idUser != undefined){
            User.deleteUser(id)
            res.send("L'utilisateur " + id + " a bien été supprimé").status(200)
        } else {
            res.send("L'utilisateur " + id + " n'existe pas").status(404)
        }
    }, 300);
})

app.listen(port, function (){
    console.log("Server running on port " + port)
})
