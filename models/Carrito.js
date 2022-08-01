const { Schema, model } = require("mongoose");


const CarritoSchema = Schema({
    userID:{
        type: Schema.ObjectId, ref: "Usuario",
        required: true,
        unique: true
    },
    Productos:
         [{type: Schema.Types.ObjectId, ref: "ItemCarrito"}]



});

module.exports= model("Carrito",CarritoSchema);