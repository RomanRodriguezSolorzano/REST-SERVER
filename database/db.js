const mongoose = require('mongoose');

const connectionDB = async () =>{
        try{
            await mongoose.connect(process.env.MONGO_CNN,{
                useNewUrlParser: true,
                useCreateIndex: true,                
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            
            console.log('Conexion Exitosa a la base de datos');

        }catch(error){
            console.log(error);
            throw new ('No se pudo conectar a la base de datos');
        }
}

module.exports = {
    connectionDB
}