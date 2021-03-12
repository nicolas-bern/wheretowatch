let db = require('../database');
let { v4: uuidv4 } = require('uuid');

class User{

    constructor(idUser, nom, prenom, email, mdp, dateInscription){
        this.idUser = idUser
        this.nom = nom
        this.prenom = prenom
        this.email = email
        this.mdp = mdp
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
            console.log(rows)
        })
    }

    static getAllUser(){
        let query = "SELECT * FROM USER ORDER BY dateInscription ASC"

        let array = []
        db.query(query).then(res => {
            for (var i = 0; i < res.length; i++) {
                let object = {}
                object['idUser'] = res[i].idUser
                object['nom'] = res[i].nom
                object['prenom'] = res[i].prenom
                object['email'] = res[i].email
                object['dateInscription'] = res[i].dateInscription
                array.push(object)
            }
        })
        return array
    }

    deleteUser(id){
        let query = 'DELETE FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value)
        console.log("L'utilisateur " + id + " a bien été supprimé")
    }

}

module.exports = User
