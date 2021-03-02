let db = require('../database');
let { v4: uuidv4 } = require('uuid');

class User{


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

    static getUserById(id){
        let query = 'SELECT * FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value).then((rows) =>{
            console.log(rows)
        })
    }

    static deleteUser(id){
        let query = 'DELETE * FROM USER WHERE idUser = ?'
        let value = [id]

        db.query(query, value)
    }
}

module.exports = User
