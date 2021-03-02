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
      getUserById(id){
        let query = 'SELECT * FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value).then((rows) =>{
            this.idUser = rows[0].idUser
            this.nom = rows[0].nom
            this.prenom = rows[0].prenom
            this.email = rows[0].email
            this.dateInscription = rows[0].dateInscription
        })
    }


    deleteUser(id){
        let query = 'DELETE FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value)
        console.log("L'utilisateur " + id + " a bien été supprimé")
    }

}

module.exports = User
