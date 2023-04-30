const express = require("express");
// const cors = require('cors');
const { connectionDB } = require("../database/db");
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
            auth: "/api/auth",
          buscar: "/api/buscar",
      categorias: "/api/categorias",
       productos: "/api/productos",
            user: "/api/user",
         uploads: "/api/uploads",
    };

    // conexion a base de datos
    this.connectDB();

    // middleware
    this.middlewares();
    // rutas
    this.routes();
  }

  async connectDB() {
    await connectionDB();
  }

  middlewares() {
    /* Cors */
    // this.app.use(cors);

    /* Directorio publico */
    this.app.use(express.static("public"));

    /* Recibir informacion con metodo POST por medio de JSON */
    /* Lectura y parseo del body */
    this.app.use(express.json());

    /* Fileupload - Cargar archivos */
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes() {
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.buscar, require("../routes/buscar"));
    this.app.use(this.path.categorias, require("../routes/categoria"));
    this.app.use(this.path.productos, require("../routes/productos"));
    this.app.use(this.path.user, require("../routes/user"));
    this.app.use(this.path.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("El servidor esta corriendo en localhost:", this.port);
    });
  }
}

module.exports = Server;
