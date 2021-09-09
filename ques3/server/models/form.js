const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,

    }
})

module.exports = mongoose.model("Form", formSchema);