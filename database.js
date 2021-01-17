const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: "localhost",
    database: "w2w",
    user: "dbuser",
    password: "epsi2020"
})

try {
    pool.getConnection()
    console.log("Connect to database")
} catch (err){
    throw err
}

module.exports = pool
