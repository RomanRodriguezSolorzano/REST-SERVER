const path = require("path");
const { v4: uuidv4 } = require('uuid');
const { User, Producto } = require("../models");
const extensionesVal=["jpg", "png", "jpeg", "gif"];

const subirArchivo = (files,extensionesValidas=extensionesVal,carpeta="") =>{

    return new Promise((resolve, reject) =>{
    const { archivo } = files;
    const extension = path.extname(archivo.name).slice(1);    
    if(!extensionesValidas.includes(extension)){
        return reject(`La extension ${extension} no es valida ${extensionesValidas}`);
    }    
    
    const nombre = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombre);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
  
      resolve(carpeta+'/'+nombre);
    });
    })
    
}

const cargarModelo = async (res,coleccion="", id="") =>{
  switch (coleccion) {
    case "users":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe ningun usuario con ese id ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe ningun producto con ese id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json("Esa coleccion aun no esta agregada");
  }

  return modelo;
}

module.exports = {
    subirArchivo,cargarModelo
}