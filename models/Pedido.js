const { Schema, model } = require("mongoose");


const PedidoSchema = Schema({
    userID:{
        type: String,
        required: true
    },
    Productos:{
        type: [Schema.ObjectId], ref: "Producto",
        required: true
    },
    Estado:{
        type: String
    },
    Direccion_entrega:{
        type: String,
        required: true
    },
    Total:{
        type: Number,
        required: true
    }
});

module.exports= model("Pedido",ProductoSchema);