const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerCat,
  obtenerCatById,
  crearCat,
  actualizarCat,
  borraCat,
} = require("../controllers/categoria");
const { validarCatID } = require("../helpers/validacion_DB");
const { validacion, validarJWT, esRoleAdmin } = require("../middlewares");
const router = Router();

router.get("/", obtenerCat);

//Utilizar el middleware de si el id existe
router.get(
  "/:id",
  [ check('id', 'No es un id valido').isMongoId,
    check("id").custom(validarCatID), validacion],
  obtenerCatById
);

router.post(
  "/",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").notEmpty(),
    validacion,
  ],
  crearCat
);

//Utilizar el middleware de si el id existe, es un id de mongo, se mande algo.
router.put(
  "/:id",
  [validarJWT, 
  check("id").custom(validarCatID),
  check("name", "El nombre es obligatorio").notEmpty(), 
  validacion],
  actualizarCat
);

//Utilizar el middleware de si el id existe, es un id de mongo
router.delete(
  "/:id",
  [check("id",'No es un ID valido').isMongoId(),
  validarJWT,
  esRoleAdmin, 
  check("id").custom(validarCatID), 
  validacion],
  borraCat
);

module.exports = router;
