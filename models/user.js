let db = require('../database');
let { v4: uuidv4 } = require('uuid');

class User{

    constructor(idUser, nom, prenom, email, mdp, dateInscription, isAdmin){
        this.idUser = idUser
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.mdp = mdp
        this.dateInscription = dateInscription
        this.isAdmin = isAdmin
    }


    static createUser(nom, prenom, email, mdp, isAdmin){
        console.log(isAdmin)

        let query = 'INSERT INTO USER(idUser, nom, prenom, email, mdp, dateInscription, isAdmin) VALUE (?, ?, ?, ?, ?, ?, ?)'
        let values = [uuidv4(), nom, prenom, email, mdp, new Date(), isAdmin]

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

    modifUser(id, nom, prenom, email, mdp){
        let query = 'UPDATE USER SET nom = ?, prenom = ?, email = ?, mdp = ? WHERE idUser = ?'
        let values = [nom, prenom, email, mdp, id]

        try {
            db.query(query, values)
            console.log("Modification effectué")
        } catch (err){
            throw err
        }
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
            this.isAdmin = rows[0].isAdmin
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
