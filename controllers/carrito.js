const { response} = require("express");
const Carrito = require("../models/Carrito")
const crearCarrito = async (req, res) => {
    //Este metodo crea un carrito, y para ello necesita SI O SI tener un ID de usuario.
    //El carrito puede estar vacio, y si quieres puedes agregar este metodo cuando se crea 
    //nuevo usuario, para que ya tenga su carrito.

    //Este metodo solo necesitara el id del usuario para funcionar.
    //Un usuario no puede tener varios carritos.
}
const quitarProducto = async (req, res) => {
    //Este metodo apara el id de un producto y la cantidad de ese producto.
    //Cuando se ejecuta este metodo, no solo tienes que quitar el producto del carrito,
    //Sino sumarle la cantidad que habia en el carrito al producto original.
    //Osea, es como si devolvieses el producto en la vida real.

    //El metodo recibe: id (Del producto), cantidad (Del producto.) 
}
const ponerProducto = async (req, res) => {
    //Este recibe rambien el id de un producto y la cantidad de este.
    //Cuando este metodo se llama, tienes que ir al producto original y quitarle la cantidad que te mando en la request.
    //Osea, como en la vida real. Cuando tomas un producto y lo hechas en el carrito, ya no esta disponible para otra persona.
    
    //El metodo recibe: id (Del producto), cantidad (Del producto.) 
}

const eliminarCarrito= async (req, res) => {
    //Con el id del carrito o del usuario, borra el carrito.
    //Este metodo es bueno por si, por ejemplo, borramos la cuenta de un usuario, tambien borramos
    //el carrito de raiz.
    //Este metodo solo se llama si el usuario deja de existir.
}

const getCarrito= async (req, res) => {
    //Usando el id del usuario, mandame el carrito de este.
}

//No es necesario editar el carrito eso ya se hace en ponerProducto y quitarProducto.