const { Router } = require("express");
const { check } = require("express-validator");
const { login, token } = require("../controllers/auth");
const { validacion } = require("../middlewares/validar-campos");
const router = Router();

router.post("/login",[    
    check('email', 'El email no es valido').isEmail(),
    check('pass', "La contraseña no debe estar vacia").notEmpty(),    
    validacion
],login);

router.post("/google",[        
    check('id_token', "Se debe enviar el token").notEmpty(),    
    validacion
],token);

module.exports = router;