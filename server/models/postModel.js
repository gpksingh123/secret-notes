const mongoose = require("mongoose")

const secretSchema = new mongoose.Schema({
    createdAt: {type: Date, required: true},
    encryptedMessage: {type: String, required: true},
    encryptionType: {type: String, required: true}
});

module.exports = Post = mongoose.model("secret",secretSchema)