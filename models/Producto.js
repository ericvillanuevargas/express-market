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
    imagen:{
        type: String,
        required: true ,
        unique: true
    },
    rating:{
        type: Number,
        required: true,
       
    },
    rating_cant:{
        type: Number,
        required: true,
        
    },
    descripcion:{
        type: String,
        required: true,
        
    },
    categoria:{

       type: Schema.ObjectId, ref: " Categoria",
       required: true,
    },

});

module.exports= model("Producto",ProductoSchema);