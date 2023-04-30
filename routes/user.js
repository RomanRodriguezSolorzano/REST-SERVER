const { Router } = require("express");
const { check } = require("express-validator");

const {validacion,
  esRoleValido,
  validarJWT} = require('../middlewares');


const { getUser, putUser, postUser, delUser } = require("../controllers/user");

const { esRolValido, emailExiste, validarID} = require("../helpers/validacion_DB");

const router = Router();

router.get("/", getUser);

router.post("/", [
    check("email", "El correo no es valido").isEmail(),
    check("email").custom(emailExiste),
    check("name", "El nombre no debe quedar vacio").not().isEmpty(),
    check("pass", "El password debe de tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    // check('role', "El rol no es valido").isIn(['ADMIN_ROLE','USER_ROLE']),
    check("role").custom(esRolValido),
    validacion,
    ],
  postUser
);

router.put("/:id",[
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(validarID),
  check("email").custom(emailExiste),
  validacion
], putUser);

router.delete("/:id",[
  validarJWT,
  // esRoleAdmin,
  esRoleValido('ADMIN_ROLE','VENTAS_ROLE'),
  check('id','No es un ID valido').isMongoId(),
  check('id').custom(validarID),
  validacion
], delUser);

module.exports = router;



