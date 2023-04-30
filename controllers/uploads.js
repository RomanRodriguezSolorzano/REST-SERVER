const fs = require("fs");
const path = require("path");
const { request, response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);


const { subirArchivo, cargarModelo } = require("../helpers");
const { User, Producto } = require("../models");

const uploads = async (req = request, res = response) => {
  try {
    const nombre = await subirArchivo(
      req.files,
      undefined,
      req.user._id.toString()
    );
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg, user: req.user._id });
  }
};

const actualizarImagen = async (req = request, res = resolve) => {
  const { id, coleccion } = req.params;

  const modelo = await cargarModelo(res, coleccion, id);

  if (modelo.img) {
    const pathImagen = path.join(__dirname, "../uploads", modelo.img);
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  modelo.img = await subirArchivo(req.files, undefined, coleccion);
  modelo.save();

  res.json({
    id,
    coleccion,
    modelo
  });
};

const actualizarImagenCloudinary = async (req = request, res = resolve) => {
  const { id, coleccion } = req.params;

  const modelo = await cargarModelo(res, coleccion, id);

  if (modelo.img) {
    const public_id = path.parse(path.basename(modelo.img)).name;
    cloudinary.uploader.destroy(public_id);
  }

  const {tempFilePath} = req.files.archivo;  
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
  modelo.img = secure_url;
  modelo.save();

  res.json({
    modelo
  });
};


const cargarImagen = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  const modelo = await cargarModelo(res, coleccion, id);
  if (modelo.img) {
    const pathImagen = path.join(__dirname, "../uploads", modelo.img);
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen);
    }
  }
  const noFoundImage = path.join(__dirname, "../assets", "no-image.jpg");

  res.sendFile(noFoundImage);
};

module.exports = {
  uploads,
  actualizarImagen,
  cargarImagen,
  actualizarImagenCloudinary,
};
