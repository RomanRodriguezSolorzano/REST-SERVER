const { response, request } = require("express");
const {User} = require('../models');
const { encriptarpass } = require("../helpers/validacion_DB");


const getUser = async (req = request, res = response) => {
  const {limit=10,since=0} = req.query;
  const filter = {state:true};
/*   const users = await User.find(filter)
                          .skip(Number.parseInt(since))
                          .limit(Number.parseInt(limit));                        
  const total = await User.countDocuments(filter); */

  const [total,users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter)
        .skip(Number.parseInt(since))
        .limit(Number.parseInt(limit))
  ]);
  res.json({
    total,
    users
  });
};

const postUser = async (req = request, res = response) => {
  
  const {name, email, pass, role} = req.body;  
  const user = new User({name, email, pass, role});

  // Encriptacion de nuestro password
  user.pass=encriptarpass(pass);
  await user.save();
  res.json({
    msg: `add to DB`,
    user
  });
  
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const {_id, __v, pass, google, email,...resto }  = req.body;   

  // Validar contra base de datos.
  if(pass)
    resto.pass=encriptarpass(pass);

  const updateUser = await User.findByIdAndUpdate(id, resto);

  res.json(updateUser);
};

const delUser = async (req = request, res = response) => {
  const {id} = req.params;
  // Usuario eliminado fisicamente en base de datos:
  // const delUser = await User.findByIdAndDelete(id);
  const delUser = await User.findByIdAndUpdate(id, {state: false});  
  res.json({
    msg: `Usuario borrado`,
    delUser
  });
};



module.exports = {
  getUser,
  putUser,
  postUser,
  delUser
};
