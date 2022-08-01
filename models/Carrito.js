const { Schema, model } = require("mongoose");


const CarritoSchema = Schema({
    userID:{
        type: Schema.ObjectId, ref: "Usuario",
        required: true,
        unique: true
    },
    Productos:{
        type: [Schema.ObjectId], ref: "Producto"
    }



});

module.exports= model("Carrito",CarritoSchema);