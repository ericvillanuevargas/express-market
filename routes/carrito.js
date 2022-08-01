const {Router } = require("express");
const { crearCarrito, quitarProducto, ponerProducto, eliminarCarrito, getCarrito } = require("../controllers/carrito");
const { validarCampos } = require("../middlewares/validar-campos");

const router= Router();


//crear nuevo carrito

router.post("/newcarrito",validarCampos, crearCarrito);

router.post("/quitarcarrito",validarCampos, quitarProducto);

router.post("/ponercarrito",validarCampos, ponerProducto);

router.post("/deletecarrito",validarCampos, eliminarCarrito);

router.get("/getcarrito",validarCampos, getCarrito);

module.exports = router; 
