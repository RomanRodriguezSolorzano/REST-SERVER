const {Schema, model} = require('mongoose');

const categoriaSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    state: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }


});

    categoriaSchema.methods.toJSON = function () {
        const {_id:id, name, user} = this.toObject();        
        return {id, name, user};
    }

module.exports = model("Categoria",categoriaSchema);