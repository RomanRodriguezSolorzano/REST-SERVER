const {request,response} = require('express');
const {User, Categoria, Producto} = require('../models');
const {ObjectId}= require('mongoose').Types;
const coleccionPerm = [
    "users", "categorias","productos"   
];

const mongoId = (termino) =>{
        return ObjectId.isValid(termino);
} 


const buscarUsers = async (termino, res=response) =>{    
    if(mongoId(termino)){
        const user = await User.findById(termino)
        return res.json({
            results: (user) ? [user] : []            
        })
    }
    const regex = new RegExp(termino, 'i');
    const users = await User.find({
        $or: [{name: regex}, {email:regex}],
        $and: [{state: true}]
    });

    res.json({
        results: users        
    })
}


const buscarCategorias = async (termino="", res=response) =>{
    if(mongoId(termino)){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []            
        })
    }
    const regex = new RegExp(termino, 'i');
    const categoria = await Categoria.find({name: regex,state: true});

    res.json({
        results: categoria        
    })
}

const buscarProducto = async (termino="", res=response) =>{
    if(mongoId(termino)){
        const producto = await Producto.findById(termino)
        return res.json({
            results: (producto) ? [producto] : []            
        })
    }
    const regex = new RegExp(termino, 'i');
    const productos = await Producto.find({
        $or: [{name: regex},{descripcion:regex}],
        $and: [{state: true}]
    });

    res.json({
        results: productos        
    })
}

const buscar = async (req=request, res=response) =>{
    const {coleccion, termino} = req.params;
    
    if(!coleccionPerm.includes(coleccion)){
        return res.status(400).json({
            msg: `La coleccion no es valida ${coleccionPerm}`
        })
    }

    switch (coleccion) {
        case 'users':
            buscarUsers(termino, res);            
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProducto(termino,res);
        break;
        default:
            res.status(500).json({
                msg: 'Esa coleccion no esta agregada'
            })
        break;
    }

}

module.exports = {
    buscar
}