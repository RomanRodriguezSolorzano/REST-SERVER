const {Role,User,Categoria, Producto} = require("../models");
const encryp = require('bcryptjs');
const { request } = require("express");

const esRolValido = async (rol) => {
  const existeRole = await Role.findOne({ rol });
  if (!existeRole) {
    throw new Error(`El rol ${rol} no esta registrado en BD`);
  }
};

const emailExiste = async (email) => {
  // Validar si el email es valido
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
};

const encriptarpass = (pass) =>{
  const salt = encryp.genSaltSync();
  const passEnc = encryp.hashSync(pass, salt);
  return passEnc; 
}

const validarID = async (id) =>{
  const existeId =  await User.findById(id);
  if(!existeId)
    throw new Error(`El id ${id} no existe`)
}

const validarCatID = async (id) =>{
  const existeId =  await Categoria.findById(id);
  if(!existeId)
    throw new Error(`El id ${id} no existe`)
}

const validarProdID = async (id) =>{
  const existeId =  await Producto.findById(id);
  if(!existeId)
    throw new Error(`El id ${id} no existe`)
}


const coleccionesPermitidas = (coleccion="", colecciones=[] )=>{    
  const incluida = colecciones.includes(coleccion);
  if(!incluida) 
    throw new Error(`La coleccion ${coleccion} no esta permitida ${colecciones}`);
  return true;
}


module.exports = {
  esRolValido,emailExiste,encriptarpass,validarID,validarCatID,validarProdID,coleccionesPermitidas
};
