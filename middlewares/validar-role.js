const { request, response } = require("express");

const esRoleAdmin = (req=request, res= response, next)=>{
    const {role, name} = req.user;
    if(!role)
        return res.status(500).json({
            msg: 'Intentan hacer un cambio sin validar el token - Error en middleware'
        })
    
    if(role!=='ADMIN_ROLE')
        return res.status(401).json({
            msg: `${name} no es administrador`
        })
    next();
}

const esRoleValido = (...roles) =>{
    return (req=require, res= response,next) =>{
        if(!req.user)
            return res.status(500).json({
                msg: 'Intentan hacer un cambio sin validar el token - Error en middleware'
            });
        
        if(!roles.includes(req.user.role))
            return res.status(401).json({
                msg: `El rol del usuario no esta dentro de los validos ${roles}`
            })
            
        next()
    }
}

module.exports = {
    esRoleAdmin, esRoleValido
}