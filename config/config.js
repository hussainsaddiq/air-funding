const env = require("dotenv");
env.config();
module.exports = {
    db: process.env.DB,
    jwtSecret: process.env.jwt_secret
}