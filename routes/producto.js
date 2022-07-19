const {Router } = require("express");
const { crearProducto, editarProducto, eliminarProducto, votar, getProductos, getProducto, searchProductos } = require("../controllers/producto");
const { validarCampos } = require("../middlewares/validar-campos");


const router= Router();

//crear nuevo producto 

router.post("/newproducto", crearProducto);
router.get("/search", searchProductos)
router.get("/getOne", getProducto)
router.get("/all", getProductos);
router.post("/vote", votar);

//ver todas las categorias


// ver una categoria
//router.get('/solo',validarCampos,getCategoria );

//ver todas las categorias

//router.get('/all',validarCampos,getCategorias );

//editar categoria 

router.post("/editproducto",editarProducto);


//eliminar categoria 

router.post("/deleteproducto",eliminarProducto);

module.exports = router; 