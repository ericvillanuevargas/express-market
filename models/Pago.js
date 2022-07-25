const { Schema, model } = require("mongoose");


const PagoSchema = Schema({
    userID:{
        type: String,
        required: true
    },
    Pago:{
        type: Decimal,
        required: true
    },
    Fecha:{
        type: Date,
        required: true
    }
});

module.exports= model("Pago",ProductoSchema);