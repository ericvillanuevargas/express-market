const { response} = require("express");
const Carrito = require("../models/Carrito")
const Usuario = require("../models/Usuario")
const Producto = require("../models/Producto");
const ItemCarrito = require("../models/ItemCarrito");
const { isValidObjectId, Mongoose } = require("mongoose");
const { db } = require("../models/Carrito");

const crearCarrito = async (req, res) => {
    //Este metodo crea un carrito, y para ello necesita SI O SI tener un ID de usuario.
    //El carrito puede estar vacio, y si quieres puedes agregar este metodo cuando se crea 
    //nuevo usuario, para que ya tenga su carrito.

    //Este metodo solo necesitara el id del usuario para funcionar.
    //Un usuario no puede tener varios carritos.

    const {userID,Productos} = req.body;

    try {
        try{
            await Usuario.findById(userID);
        }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'ID no encontrado.',
            })
        }

        const dbCar= new Carrito(req.body);

        await dbCar.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            userID: userID,
            Productos: Productos

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creando carrito',
        })
    }

}
const quitarProducto = async (req, res) => {
    //Este metodo apara el id de un producto y la cantidad de ese producto.
    //Cuando se ejecuta este metodo, no solo tienes que quitar el producto del carrito,
    //Sino sumarle la cantidad que habia en el carrito al producto original.
    //Osea, es como si devolvieses el producto en la vida real.

    //El metodo recibe: id (Del producto), cantidad (Del producto.) 

    const { ProdId, userID,carritoID,ItemCarritoID, cant}= req.body

    try {

      

        let ItemCarri = await ItemCarrito.findById({_id: ItemCarritoID})
        if(ItemCarri){

            let product = await ItemCarrito.productoID
                if(product){
                    const dbItemCarrito= new ItemCarrito(req.body);
                    await dbItemCarrito.save();
                    await Producto.updateOne({_id:ProdId},{

                        cantidad: cantidad + ItemCarrito.cantidad
                        
                        
                    })

                    return res.status(201).json({
                        ok:true,
                        Productos: ProdID,
                        msg: "Se ha añadido el producto."
                    })
                    
                }
                else{
                    return res.status(400).json({
                        ok: false,
                        msg: 'No hemos encontrado este producto'
                    })
                }
        }
        else{
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este usuario'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error seleccionando carrito'
        })
    }

}
const ponerProducto = async (req, res) => {
    //Este recibe rambien el id de un producto y la cantidad de este.
    //Cuando este metodo se llama, tienes que ir al producto original y quitarle la cantidad que te mando en la request.
    //Osea, como en la vida real. Cuando tomas un producto y lo hechas en el carrito, ya no esta disponible para otra persona.
    
    //El metodo recibe: id (Del producto), cantidad (Del producto.) 

    const { ProdID, cantidad, carritoID }= req.body

    try {
        //usuario
        let carrito = await Carrito.findById(carritoID);
        if(carrito){
                //producto
                let product = await Producto.findById( ProdID)
                if(product){
                    //introduccir id producto

                    const dbItemCarrito= new ItemCarrito(req.body);
                    await dbItemCarrito.save();
                    await Carrito.updateOne({_id:carritoID},{
                        $push: {Productos: dbItemCarrito._id}
                        
                    })

                    return res.status(201).json({
                        ok:true,
                        Productos: ProdID,
                        msg: "Se ha añadido el producto."
                    })

                }
                else{
                    return res.status(400).json({
                        ok: false,
                        msg: 'No hemos encontrado este producto'
                    })
                }
        }
        else{
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este carrito'
            })
        }
        
    } catch (error) {
        console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error seleccionando carrito',
            })
    }



}

const eliminarCarrito= async (req, res) => {
    //Con el id del carrito o del usuario, borra el carrito.
    //Este metodo es bueno por si, por ejemplo, borramos la cuenta de un usuario, tambien borramos
    //el carrito de raiz.
    //Este metodo solo se llama si el usuario deja de existir.
}

const getCarrito= async (req, res) => {
    //Usando el id del usuario, mandame el carrito de este.

    const 
        carritoID
        = req.header('carritoID');
    try{

        let carrito = await Carrito.findById(carritoID).populate('Productos');
        if(!carrito ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado este carrito'
        })
        }
        else{
            return res.json(carrito)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error obteniendo carrito',
        })
    }

}




//No es necesario editar el carrito eso ya se hace en ponerProducto y quitarProducto.

module.exports = {
    crearCarrito,
    quitarProducto,
    ponerProducto,
    eliminarCarrito,
    getCarrito
}