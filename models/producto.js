const {Schema, model} = require('mongoose');

const productoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0        
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {type: String}
});

    productoSchema.methods.toJSON = function () {        
        const {__v, state, ...data} = this.toObject();        
        return data;
    }

module.exports = model("Producto",productoSchema);