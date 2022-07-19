const { response} = require("express");
const Producto = require("../models/Producto")
const Categoria = require("../models/Categoria")

const crearProducto = async (req, res= response) => {

    const {name,precio,imagenes,cantidad,categoria} = req.body;
    // const prueba = await Categoria.aggregate(

       
    //     [
    //         {
    //             $lookup:
    //             {
    //                 from:"Producto",
    //                 localField:"name",
    //                 foreignField:"categoria",
    //                 as: "categoriaName"
    //             }
    //         },
            
    //         {$match: {categories: categoria}  }

    //     ]
    // )
    

    try{
        try{
            await Categoria.findById(categoria);
        }
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Categoria invalida.',
            })
        }

        
        let producto= await Producto.findOne({name: name});
        
        if(producto){
            return res.status(400).json({
                ok: false,
                msg: 'Este producto ya existe'
            })
        }
    

        const dbProd= new Producto(req.body);

        await dbProd.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbProd.id,
            name: name,
            price: precio

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

const votar = async (req, res= response) => {

    try{
        const {_id, rating} = req.body;
    
            let producto= await Producto.findById({_id: _id});
            if(!producto ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hemos encontrado este producto'
                })
            }
            else{
                let ratings = producto.ratings;
                ratings.push(rating);
                await Producto.updateOne({ _id: _id},{
                    rating: Math.floor((ratings.reduce((a,b) => a + b, 0) / ratings.length)),
                    ratings: ratings
            
                })
                return res.status(201).json({
                    ok:true,
                    name: producto.name,
                    msg: "Gracias por su retroalimentacion"
                })
            }
        }    
        catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error registrando rating',
            })
        }
}
const editarProducto = async (req, res= response) => {

    try{
        const {_id,name,precio,imagenes,cantidad,categoria,ratings} = req.body;
    
            let producto= await Producto.findById({_id: _id});
            if(!producto ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hemos encontrado este producto'
                })
            }
            else{
                ratingsProd = producto.ratings;
                await Producto.updateOne({ _id: _id},{
                    name: name,
                    precio: precio,
                    imagenes: imagenes,
                    rating: Math.floor((ratingsProd.reduce((a,b) => a + b, 0) / ratingsProd.length)),
                    ratings: ratings,
                    cantidad: cantidad,
                    categoria: categoria
                   
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
                msg: 'Error actualizando producto',
            })
        }
}

const eliminarProducto = async (req, res= response) => {

    const {
        _id
        } = req.body;
    try{

        //Encontrar el producto en base al ID

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

const getProductos = async (req, res = response)=>{
    try{
    let productos = await Producto.find()
    if(!productos) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay productos en la base de datos'
        })
    }
    else{
        return res.json(productos)
        
    }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo todos los productos',
        })
    }
}

const searchProductos = async (req, res = response)=>{
    try{
        const {categoria, query} = req.body;
        let categoriaId = await Categoria.findOne({name: categoria});
        let productos =[]; 
        if(!query && categoriaId){
            productos = await Producto.find({categoria: categoriaId})
        }
        if(!categoriaId && query){
            productos = await Producto.find({name: {"$regex": query}})
        }
        if(categoriaId && query){
            productos = await Producto.find({name: {"$regex": query} , categoria: categoriaId})
        }
        if(productos.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay productos bajo la busqueda ' + '"' + query + '"'
                })
            }
        else{
            return res.json(productos)
        }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo productos',
        })
    }
}


const getProducto = async (req, res = response)=>{
    const {
        _id
        } = req.body;
    
    try{

        let producto= await Producto.findById(_id);
        if(!producto ) {
        return res.status(400).json({
            ok: false,
            msg: 'Este producto no existe.'
        })
        }
        else{
            return res.json(producto)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error buscando producto expecifico',
        })
    }

}

module.exports = {
    getProductos,
    getProducto,
    crearProducto,
    editarProducto,
    eliminarProducto,
    searchProductos,
    votar
}