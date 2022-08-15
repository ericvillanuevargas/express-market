const { Schema, model } = require("mongoose");


const CategoriaSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    Url:{
        type: String,
        required: true
    },
    

});

module.exports= model("Categoria",CategoriaSchema);