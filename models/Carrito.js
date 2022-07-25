const { Schema, model } = require("mongoose");


const CarritoSchema = Schema({
    userID:{
        type: String,
        required: true
    },
    Productos:{
        type: [Schema.ObjectId], ref: "Producto",
        required: true
    }



});

module.exports= model("Carrito",ProductoSchema);