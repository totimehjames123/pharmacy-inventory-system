import mongoose from 'mongoose'
require('dotenv').config()
module.exports = mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
.then(
    console.log("Connected to MongoDB Successfully!")
).catch((error) => {
    console.error("Failed to connect!", error.message)
})

