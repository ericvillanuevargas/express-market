const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();




//Crear el servidor/aplicacion de express

const app = express();

//base de datos


dbConnection();

//Directorio Publico

app.use( express.static("public") );

//CORS
var corsOptions = {
    origin: 'http://http://localhost:4200/',
    optionsSuccessStatus: 200 }

app.use(cors(corsOptions));

//Lectura y parseo del body 

app.use(express.json() );


//rutas

app.use("/api/auth", require("./routes/auth"));


app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});