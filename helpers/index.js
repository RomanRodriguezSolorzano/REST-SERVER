const generajwt = require('./generarJWT');
const googleverify = require('./googleVerify');
const subirarchivo = require('./subir-archivo');
const validacionBD = require('./validacion_DB');

module.exports = {
    ...generajwt,
    ...googleverify,
    ...subirarchivo,
    ...validacionBD,
}