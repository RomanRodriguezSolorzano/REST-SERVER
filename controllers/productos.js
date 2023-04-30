const { response, request } = require("express");
const { validarCatID } = require("../helpers/validacion_DB");
const { Producto, Categoria } = require("../models");

// paginado - total de registro - populate
const obtenerProd = async (req = request, res = response) => {
  try {
    const { limit = 10, since = 0 } = req.query;
    const filter = { state: true };
    const [total, productos] = await Promise.all([
      Producto.countDocuments(filter),
      Producto.find(filter)
        .populate("user", "name")
        .populate("categoria","name")
        .skip(Number.parseInt(since))
        .limit(Number.parseInt(limit)),
    ]);

    res.json({
      total,
      productos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error contacte con el administrador"
    });
  }
};

// Obtener categoria - populate
const obtenerProdById = async (req = request, res = response) => {
  const { id } = req.params;  
  const ProdById = await Producto.findById(id)
                                 .populate("user", "name email")
                                 .populate("categoria","name");
  
  res.json({
    msg: "get Producto by ID",
    ProdById
  });
};

const crearProd = async (req = request, res = response) => {    
  let {state, user, name, ...resto } = req.body; 
  name = name.toUpperCase();  
  const existe = await Producto.findOne({ name });
  if (existe) {
    res.status(400).json({
      msg: `El producto ${existe.name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
    ...resto
  };
  const producto = new Producto(data);
  await producto.save();

  res.status(201).json({
    msg: "crear producto post",
    producto,
  });
};


const actualizarProd = async (req = request, res = response) => {
  const {id} = req.params;      
  let {categoria, ...data} = req.body;
  if(data.name){
    data.name = data.name.toUpperCase();    
  }
  if(categoria){
    const validar = await Categoria.findById(categoria);
    if(!validar){
        res.status(400).json({
            msg: 'La categoria enviada no es valida'
          })
    }
    data.categoria = categoria;        
  }  
  const {state} = await Producto.findById(id);  
  if(!state){
    res.status(400).json({
      msg: 'El registro que quieres actualizar no es valido'
    })
  }

  const updateProducto = await Producto.findByIdAndUpdate(id,data,{new: true});


  res.json({
    updateProducto
  });
};

//Cambiar el estado del id.
const borraProd = async (req = request, res = response) => {
  const {id} = req.params;
  const deleteProducto = await Producto.findByIdAndUpdate(id,{state: false});

  res.json({
    msg: "Borrar categoria",
    deleteProducto
  });
};

module.exports = {
  obtenerProd,
  obtenerProdById,
  crearProd,
  actualizarProd,
  borraProd,
};
