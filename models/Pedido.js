const { Schema, model } = require("mongoose");


const PedidoSchema = Schema({
    userID:{
        type: String,
        required: true
    },
    deliveryID:{
        type: String,
        required: true
    },
    Productos:{
        type: Schema.ObjectId, ref: "Carrito",
        required: true
    },
    Estado:{
        type: string,
        required: true
    },
    Direccion_entrega:{
        type: string,
        required: true
    },
});

module.exports= model("Pedido",ProductoSchema);