const { response} = require("express");
const Producto = require("../models/Producto")
const Categoria = require("../models/Categoria")

const crearProducto = async (req, res= response) => {

    const {name,precio,imagen,rating,rating_cant,descripcion,categories} = req.body;


    let categoria= await Categoria.findOne({name: name});

   

    const prueba = await Categoria.aggregate(

       
        [
            {
                $lookup:
                {
                    from:"Producto",
                    localField:"name",
                    foreignField:"categoria",
                    as: "categoriaName"
                }
            },
            
            {$match: {categories: categoria}  }

        ]
    )
    
    try{


        
        let producto= await Producto.findOne({name});
        
        if(producto){
            return res.status(400).json({
                ok: false,
                msg: 'este producto ya existe'
            })
        }
    
        // Crear libro con el modelo
        const dbProd= new Producto(req.body);
        //Crear libro en la  BD
        await dbProd.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbProd.id,
            name,
            precio,
            descripcion,
            categories: prueba,

        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error creando producto',
        })
    }
    
}


const editarProducto = async (req, res= response) => {

    try{
        const {name,precio,imagen,rating,rating_cant,descripcion,categories} = req.body;
    
            let producto= await Producto.findById({_id: _id});
            if(!producto ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hemos encontrado este producto'
                })
            }
            else{
                await Producto.updateOne({ _id: _id},{
                    name: name,
                    precio: precio,
                    imagen: imagen,
                    rating:rating,
                    rating_cant: rating_cant,
                    descripcion: descripcion,
                    categoria: categories
                   
                })
                return res.status(201).json({
                    ok:true,
                    name: producto.name,
                    msg: "Se ha actualizado el producto correctamente."
                })
            }
        }    
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error actualizando categoria',
            })
        }
}

const eliminarProducto = async (req, res= response) => {

    const {
        _id
        } = req.body;
    try{
        //Verificar el email

        let producto = await Producto.findById({_id: _id});
        if(!producto ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado este producto'
            })
        }
        else{
            await Producto.deleteOne({ _id: producto._id })
        }
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            name: producto.name,
            msg: "Se ha borrado el producto correctamente."
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error eliminando producto ',
        })
    }

}

module.exports = {
    crearProducto,
    editarProducto,
    eliminarProducto
}