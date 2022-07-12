const { response} = require("express");
const Categoria = require("../models/Categoria")



const crearCategoria = async (req, res= response) => {

   const {name,Url} = req.body;
   
   try{


    let categoria = await Categoria.findOne({name});
    if( categoria ) {
        return res.status(400).json({
            ok: false,
            msg: 'Ya se ha creado una categoria con este nombre.'
        })
    }

    // Crear libro con el modelo
    const dbCate= new Categoria (req.body);
    //Crear libro en la  BD
    await dbCate.save();
    //Generar respuesta exitosa
    return res.status(201).json({
        ok:true,
        uid: dbCate.id,
        name: name
    })
}
catch (error){
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Error creando categoria',
    })
}

}



const eliminarCategoria = async (req, res= response) => {
    const {
        _id
        } = req.body;
    try{
        //Verificar el email

        let categoria = await Categoria.findById({_id: _id});
        if(!categoria ) {
            return res.status(400).json({
                ok: false,
                msg: 'No hemos encontrado esta categoria'
            })
        }
        else{
            await Categoria.deleteOne({ _id: categoria._id })
        }
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            name: categoria.name,
            msg: "Se ha borrado la categoria correctamente."
        })
    }
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error eliminando categoria ',
        })
    }
    
}

const getCategoria = async (req, res = response)=>{
    const 
        _id
        = req.header('_id');

    
    try{

        let categoria = await Categoria.findById(_id);
        if(!categoria ) {
        return res.status(400).json({
            ok: false,
            msg: 'No hemos encontrado esta categoria'
        })
        }
        else{
            return res.json(categoria)
        }
}
    catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo categoria',
        })
    }

}

const getCategorias = async (req, res = response)=>{
    try{
    let categoria = await Categoria.find()
    if(!categoria) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay categorias en la base de datos'
        })
    }
    else{
        return res.json(categoria)
        
    }
    }
        catch (error){
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error obteniendo todos los libros',
        })
    }
}

const editarCategoria = async (req, res) => {

    try{
        const {
            _id,
            name,
            Url
            } = req.body;
    
            let categoria = await Categoria.findById({_id: _id});
            if(!categoria ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hemos encontrado esta categoria'
                })
            }
            else{
                await Categoria.updateOne({ _id: _id},{
                    name: name,
                    Url: Url,
                   
                })
                return res.status(201).json({
                    ok:true,
                    name: categoria.name,
                    msg: "Se ha actualizado la categoria correctamente."
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

module.exports={
    crearCategoria,
    editarCategoria,
    eliminarCategoria,
    getCategoria,
    getCategorias
}