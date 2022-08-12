const {Router } = require("express");
const { crearPedido, actualizarEstadoPedido, cancelarPedido, getPedidos} = require("../controllers/pedido");
const { validarCampos } = require("../middlewares/validar-campos");

const router= Router();


//crear nuevo carrito

router.post("/new",validarCampos, crearPedido);

router.post("/actualizar",validarCampos, actualizarEstadoPedido);


router.post("/cancelar",validarCampos, cancelarPedido);

router.get("/get",validarCampos, getPedidos);

module.exports = router; 
