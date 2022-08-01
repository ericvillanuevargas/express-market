const { Schema, model } = require("mongoose");


const ItemCarritoSchema = Schema({
    carritoID:{
        type: Schema.ObjectId, ref: "Carrito",
        required: true,
    },
    productoID:{
        type: Schema.ObjectId, ref: "Producto"
    },
    cantidad:{
        type: Number,
        required:true,
        default:1

    }



});

module.exports= model("ItemCarrito",ItemCarritoSchema);