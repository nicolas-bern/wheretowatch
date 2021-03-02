let db = require('../database');
let { v4: uuidv4 } = require('uuid');

class User{

    constructor(idUser, nom, prenom, email, dateInscription){
        this.idUser = idUser
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.dateInscription = dateInscription
    }


    static createUser(nom, prenom, email, mdp){
        let query = 'INSERT INTO USER(idUser, nom, prenom, email, mdp, dateInscription) VALUE (?, ?, ?, ?, ?, ?)'
        let values = [uuidv4(), nom, prenom, email, mdp, new Date()]

        try {
            db.query(query, values)
            console.log("New user inserted")
        } catch (err){
            throw err
        }
    }

    static getAllUser(){
        let query = "SELECT * FROM USER ORDER BY dateInscription ASC"

        db.query(query)
    }


    /**
     * Méthode pour récupérer un utilisateur avec son id
     * @param id
     */
    static getUserById(id){
        let user = []
        let query = 'SELECT * FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value).then((rows) =>{
            user.push(rows[0].idUser)
            user.push(rows[0].nom)
            user.push(rows[0].prenom)
            user.push(rows[0].email)
            user.push(rows[0].dateInscription)
        })
        return user
    }

    static deleteUser(id){
        let query = 'DELETE * FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value)
    }
}

module.exports = User
