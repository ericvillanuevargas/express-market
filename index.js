const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();




//Crear el servidor/aplicacion de express

const app = express();
app.use(cors());
//base de datos


dbConnection();

//Directorio Publico

app.use( express.static("public") );

//CORS



//Lectura y parseo del body 

app.use(express.json() );


//rutas

app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/producto", require("./routes/producto"));
app.use("/api/carrito", require("./routes/carrito"));
app.use("/api/pedidos", require("./routes/pedido"));
//Manejar todas las otras rutas
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname,'public/index.html'))
}) 
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});