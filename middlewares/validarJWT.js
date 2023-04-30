const { request, response } = require("express")
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async (req=request, res=response, next)=>{
    const JWToken = req.header('JWToken');
    if(!JWToken)
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    try{
        const {uid} = jwt.verify(JWToken, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);                
        if(!user)
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        if(!user.state)
            return res.status(401).json({
                msg: 'Token no válido - Usurio inhabilitado'
            })
        req.user = user;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
}

module.exports = {
    validarJWT
}