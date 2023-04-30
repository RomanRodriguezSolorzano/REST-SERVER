const { response, request } = require("express");
const { Categoria } = require("../models");

// paginado - total de registro - populate
const obtenerCat = async (req = request, res = response) => {
  try {
    const { limit = 10, since = 0 } = req.query;
    const filter = { state: true };
    const [total, categoria] = await Promise.all([
      Categoria.countDocuments(filter),
      Categoria.find(filter)
        .populate("user", "name email")
        .skip(Number.parseInt(since))
        .limit(Number.parseInt(limit)),
    ]);

    res.json({
      total,
      categoria,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error contacte con el administrador"
    });
  }
};

// Obtener categoria - populate
const obtenerCatById = async (req = request, res = response) => {
  const { id } = req.params;  
  const CatById = await Categoria.findById(id)
                                 .populate("user", "name email")
  
  res.json({
    msg: "get Categoria by ID",
    CatById
  });
};

const crearCat = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const existe = await Categoria.findOne({ name });
  if (existe) {
    res.status(400).json({
      msg: `La categoria ${existe.name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };
  const categoria = new Categoria(data);
  await categoria.save();

  res.status(201).json({
    msg: "crear categoria post",
    categoria,
  });
};

//solo modificar el nombre
const actualizarCat = async (req = request, res = response) => {
  const {id} = req.params;
  let {name} = req.body;
  name = name.toUpperCase();
  const {state} = await Categoria.findById(id);  
  if(!state){
    res.status(400).json({
      msg: 'El registro que quieres actualizar no es valido'
    })
  }

  const updateCategoria = await Categoria.findByIdAndUpdate(id,{name});


  res.json({
    msg: "actualizar categoria",
    updateCategoria
  });
};

//Cambiar el estado del id.
const borraCat = async (req = request, res = response) => {
  const {id} = req.params;
  const deleteCategoria = await Categoria.findByIdAndUpdate(id,{state: false});

  res.json({
    msg: "Borrar categoria",
    deleteCategoria
  });
};

module.exports = {
  obtenerCat,
  obtenerCatById,
  crearCat,
  actualizarCat,
  borraCat,
};
