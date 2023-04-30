const {Schema, model} = require('mongoose');

const roleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'the Rol is required']
    }});

module.exports = model("Role",roleSchema);