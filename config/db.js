const mongoose = require("mongoose");
const {db} = require("./config");
console.log(`database: ${db}`)
const connect = () => {
    mongoose.connect(db).then(() => {
        console.log('Database connected')
    }).catch((error) => {
        console.log('Error: ', error)
    })
}
module.exports = connect;