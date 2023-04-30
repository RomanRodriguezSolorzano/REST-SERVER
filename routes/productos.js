const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerProd,
  obtenerProdById,
  crearProd,
  actualizarProd,
  borraProd,
} = require("../controllers/productos");
const { validarCatID, validarProdID } = require("../helpers/validacion_DB");
const { validacion, validarJWT, esRoleAdmin } = require("../middlewares");
const router = Router();

router.get("/", obtenerProd);

//Utilizar el middleware de si el id existe
router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validarProdID),
    validacion
  ],
  obtenerProdById
);

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    check("categoria").custom(validarCatID),
    validacion
  ],
  crearProd
);

//Utilizar el middleware de si el id existe, es un id de mongo, se mande algo.
router.put(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    validarJWT,
    check("id").custom(validarProdID),        
    validacion
  ],
  actualizarProd
);

//Utilizar el middleware de si el id existe, es un id de mongo
router.delete(
  "/:id",
  [
    check("id", "No es un Id valido").isMongoId(),
    validarJWT,
    esRoleAdmin,
    check("id").custom(validarProdID),        
    validacion
  ],
  borraProd
);

module.exports = router;
