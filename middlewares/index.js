const validarCampos  = require("./validar-campos");
const validarRole    = require("./validar-role");
const validarJWT     = require("./validarJWT");
const validarArchivo = require("./validar-uploads")

module.exports = {
    ...validarCampos,
    ...validarRole,
    ...validarJWT,
    ...validarArchivo
}