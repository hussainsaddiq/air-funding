const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    photo: {
        required: false,
        type: String,
        default: ''
    },
    verified: {
        required: false,
        type: Boolean,
        default: false
    },
    admin: {
        required: false,
        type: Boolean,
        default: false
    }
},{ timestamps: true })

const User = mongoose.model("user", userSchema);
module.exports = User;

