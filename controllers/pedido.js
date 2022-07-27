const { response} = require("express");
const Pedido = require("../models/Pedido")


const crearPedido= async (req, res) => {
    //Este metodo representa ya cuando el usuario pago y su pedido arranca.
    //Este metodo agarra los productos que estaban en el carrito, y limpia el contenido del carrito.
    
    //Todo pedido tiene tres estados: "aprobado", "en camino" y "finalizado"
    //Pero todos empiezan en "aprobado"

    //El metodo recibe: userID, productos y direccion.
    //Es tu responsabilidad no solo limpiar el carrito, sino calcular el total. 

}

const actualizarEstadoPedido= async (req, res) => {
    //Este metodo pasa el estado de "aprobado" a "en camino", o de "en camino" a "finalizado", nunca al revez.
    //Cuando se actualiza de "en camino" a "finalizado", tienes que:
    // 1.Crear un objeto de Pago. Pa registrar pues el pago mamaguevo XD. No es necesario editar ni eliminar el pago.
    // 2.Relajarte y ver a LeBolicua. Esos productos dejaron de existir y ya los extragiste del carrito, no hay na que hacer.
    
    //El metodo recibe: id (del pedido), y el estado actual, para que lo pases al siguiente.
    //Si alguien pone el huevo de mandar el estado "finalizado" mandalo pa la mierda porque ya no hay na que hacer XD 
}
const cancelarPedido= async (req, res) => {
    //Borras el pedido, no sin antes devolver los productos de este al carrito. Recuerda que puedes usar el userID para hacer esto.
    //Solamente un pedido de estado "aprobado" se puede cancelar. los otros 2 estados ya no se pueden dar pa' tra'

    //El metodo recibe: id (del pedido)
}