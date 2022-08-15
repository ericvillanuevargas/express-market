const { response} = require("express");
const Carrito = require("../models/Carrito");
const Pedido = require("../models/Pedido")


const crearPedido= async (req, res) => {
    //Este metodo representa ya cuando el usuario pago y su pedido arranca.
    //Este metodo agarra los productos que estaban en el carrito, y limpia el contenido del carrito.
    
    //Todo pedido tiene tres estados: "aprobado", "en camino" y "finalizado"
    //Pero todos empiezan en "aprobado"

    //El metodo recibe: userID, productos y direccion.
    //Es tu responsabilidad no solo limpiar el carrito, sino calcular el total. 

    const {CarritoID,Direccion_entrega}= req.body

    try {
        //usuario
        let carrito = await Carrito.findById(CarritoID);

        if(carrito){
            
                    const dbPedido= new Pedido({
                        userID: carrito.userID,
                        Productos: carrito.Productos,
                        Estado: "Aprobado",
        
                        Direccion_entrega: Direccion_entrega
                    });
                    console.log(dbPedido);
                    await Carrito.updateOne({ _id: CarritoID},{

                        Productos: []
                       
                    })
                    //console.log(dbPedido);
                    await dbPedido.save();
                    
                    return res.status(201).json({
                        ok:true,
                        msg: "Se ha creado el pedido"
                    })

                }
                else{
                    return res.status(400).json({
                        ok: false,
                        msg: 'No hemos encontrado este producto'
                    })
                }
        }
         catch (error) {
        console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error creando pedido',
            })
    }

}

const actualizarEstadoPedido= async (req, res) => {
    //Este metodo pasa el estado de "aprobado" a "en camino", o de "en camino" a "finalizado", nunca al revez.
    //Cuando se actualiza de "en camino" a "finalizado", tienes que:
    // 1.Crear un objeto de Pago. Pa registrar pues el pago mamaguevo XD. No es necesario editar ni eliminar el pago.
    // 2.Relajarte y ver a LeBolicua. Esos productos dejaron de existir y ya los extragiste del carrito, no hay na que hacer.
    
    //El metodo recibe: id (del pedido), y el estado actual, para que lo pases al siguiente.
    //Si alguien pone el huevo de mandar el estado "finalizado" mandalo pa la mierda porque ya no hay na que hacer XD 
    const {PedidoID}= req.body;
    let pedido = await Pedido.findById(PedidoID);
    if(pedido){
        if(pedido.Estado === "Aprobado"){
            await Pedido.updateOne({ _id: PedidoID},{

                Estado: "En Camino"
            })
            return res.status(200).json({
                ok: true,
                msg: 'Su pedido esta en camino...'
            })
        }
        if(pedido.Estado === "En Camino"){
            await Pedido.updateOne({ _id: PedidoID},{
                Estado: "Finalizado"
            })
            return res.status(200).json({
                ok: true,
                msg: 'Su pedido esta finalizado!'
            })
        }
        if(pedido.Estado === "Finalizado"){             
            return res.status(400).json({
            ok: true,
            msg: 'Este pedido ya no se puede alterar.',
        })}
    }
}
const cancelarPedido= async (req, res) => {
    //Borras el pedido, no sin antes devolver los productos de este al carrito. Recuerda que puedes usar el userID para hacer esto.
    //Solamente un pedido de estado "aprobado" se puede cancelar. los otros 2 estados ya no se pueden dar pa' tra'

    //El metodo recibe: id (del pedido)

    const {PedidoID}= req.body;
    let pedido = await Pedido.findById(PedidoID);
    if(pedido){
        let carrito = await Carrito.findOne({userID: pedido.userID});
        
        await Carrito.updateOne({userID: pedido.userID},{

            Productos: carrito.Productos.concat( pedido.Productos)
           
        })
        await Pedido.deleteOne({ _id: PedidoID })
        return res.status(200).json({
            ok: true,
            msg: 'Su pedido esta en camino...'
        })
    }
}

const getPedidos = async (req, res) => {
    const 
        userID
        = req.header('userID');
    try{

        let pedido = await Pedido.find({userID:userID}).populate('Productos').populate({
            path : 'Productos',
            populate : {
              path : 'productoID'
            }
          });
        if(!pedido ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado este pedido'
        })
        }
        else{

            return res.json(pedido)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error obteniendo pedidos',
        })
    }

}
module.exports={
    crearPedido,
    actualizarEstadoPedido,
    cancelarPedido,
    getPedidos
}