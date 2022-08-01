const { Schema, model } = require("mongoose");


const ProductoSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    precio:{
        type: Number,
        required: true,
        
    },
    cantidad:{
        type: Number,
        required: true,
        
    },
    imagenes:{
        type: [String],
        required: true
    },
    descripcion:{
        type: String
    },
    rating:{
        type: Number,
        default: 0
       
    },
    ratings:{
        type: [Number],
        default: 0
    },
    categoria:{

       type: Schema.ObjectId, ref: "Categoria",
       required: true
    },

});

module.exports= model("Producto",ProductoSchema);