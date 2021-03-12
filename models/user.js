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



    modifUser(id, nom, prenom, email, mdp, isAdmin){


        let query = 'UPDATE USER SET nom = ?, prenom = ?, email = ?, mdp = ?, isAdmin = ? WHERE idUser = ?'
        let values = [nom, prenom, email, mdp, isAdmin, id]

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
                object['isAdmin'] = res[i].isAdmin
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

    loginUser(email, mdp){
        let query = 'SELECT * FROM USER WHERE email = ? AND mdp = ?'
        let value = [email, mdp]
        db.query(query, value).then((rows) => {
            if (rows.length != null){
                this.idUser = rows[0].idUser
                this.nom = rows[0].nom
                this.prenom = rows[0].prenom
                this.email = rows[0].email
                this.mdp = rows[0].mdp
                this.dateInscription = rows[0].dateInscription
                this.isAdmin = rows[0].isAdmin
            }else {
                return false
            }

        })
      }

}

module.exports = User
