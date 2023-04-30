const { response, request } = require("express");
const User = require('../models/user');
const encryp = require('bcryptjs');
const {generarJWT} = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");
const { encriptarpass } = require("../helpers/validacion_DB");

const login = async (req = request, res = response) =>{
    const {email,pass} = req.body;
    // const auth = await User.find().and([email,pass]);

    try{
        // Verificar si el correo existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'El email o la contraseña no son correctos'
            });
        }

        // Verificar si el estado del usuario esta habilitado
        if(!user.state){
            return res.status(400).json({
                msg: 'El email o la contraseña no son correctos'
            });
        }


        // Verificar la contraseña
        const validarPass = encryp.compareSync(pass, user.pass);
        if(!validarPass){
            return res.status(400).json({
                msg: 'El email o la contraseña no son correctos'
            });
        }

        // Generar un JWT
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

const token = async (req=request, res=response) =>{
    const {id_token} = req.body;    
    try{
        const {name,email, img} = await googleVerify(id_token);        
        let user = await User.findOne({email});        
        if(!user){
            const data = {
                name,
                email,
                img,
                pass: encriptarpass('pass'),
                google: true
            }

            user = new User(data);
            await user.save();            
        }
                
        if(!user.state){
            res.status(401).json({
                msg: 'Hable con el administrador ya que el usuarios se encuentra bloqueado'
            });
        }
        
        const token = generarJWT(user.id);        
    
    res.json({
        msg: 'Login con google',
        user,
        token  
    });
}catch(error){
    res.status(400).json({
        msg: 'Token de Google inválido'
    });
}
}


module.exports = {
    login,token
}