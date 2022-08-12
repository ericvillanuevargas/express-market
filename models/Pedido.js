const { Schema, model } = require("mongoose");


const PedidoSchema = Schema({
    userID:{
        type: String,
        required: true
    },
    Productos:
        [{type: Schema.Types.ObjectId, ref: "ItemCarrito", required:true}],
    Estado:{
        type: String
    },
    Fecha:{
        type: String,
    },
    Direccion_entrega:{
        type: String,
        required: true
    }
});

module.exports= model("Pedido",PedidoSchema);