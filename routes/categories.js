const {Router } = require("express");
const { validarCampos } = require("../middlewares/validar-campos");
const { crearCategoria, editarCategoria, eliminarCategoria, getCategoria, getCategorias } = require("../controllers/categoria");


const router= Router();

//crear nueva categoria 

router.post("/newcategoria",validarCampos, crearCategoria);

//ver todas las categorias


// ver una categoria
router.get('/solo',validarCampos,getCategoria );

//ver todas las categorias

router.get('/all',validarCampos,getCategorias );

//editar categoria 

router.post("/editcategoria",validarCampos,editarCategoria);


//eliminar categoria 

router.post("/deletecategoria",validarCampos,eliminarCategoria);





module.exports = router; 