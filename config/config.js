const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    GMAIL_APP_USER:process.env.GMAIL_APP_USER,
    GMAIL_APP_PASSWORD:process.env.GMAIL_APP_PASSWORD
}