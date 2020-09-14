const db = require('../database/dbConfig')

// Add a user and hash the password
function addUser(userCredentials){
    return db("users")
        .insert(userCredentials)
}

// Log in the user, authenticate the credentials
function findBy(filter){
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}

module.exports = {
    addUser,
    findBy
}