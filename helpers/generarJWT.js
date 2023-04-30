const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') =>{
    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '24h'
        }, (err, token) =>{
            if(err){
                console.log(err);
                return reject('No se pudo generar el token')
            }
            else{
                return resolve(token);
            }

        });
    })
}

module.exports = {generarJWT};