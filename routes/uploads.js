const { Router } = require('express');
const { check } = require("express-validator");
const {coleccionesPermitidas} = require('../helpers');
const { uploads, actualizarImagen, cargarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { validarJWT, validacion, validarArchivo } = require('../middlewares');

const router = Router();


router.get("/:coleccion/:id",[       
    check("id",'Tiene que ser un id valido').isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,['users','productos'])),
    validacion],cargarImagen)

router.post('/',[validarJWT,validarArchivo,validacion], uploads);

router.put('/:coleccion/:id',[
    validarArchivo,    
    check("id",'Tiene que ser un id valido').isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,['users','productos'])),
    validacion],actualizarImagenCloudinary)

module.exports = router;