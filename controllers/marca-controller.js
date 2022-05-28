const Marca = require('../models/Marca');

const Usuario = require('../models/Usuario')


/* ********************************************************************************************* */
// Listar todos las marcas 

const getAll = async(req, res) => {

    try 
    {
        console.log("GET/marcas")
        const response = await Marca.find({}).populate(
            {
                path: 'usuario',
                select: 'nombre email estado'
            }
        );

        console.log(response);
        res.status(200).json(response);

    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
};

/* ********************************************************************************************* */
const getStateActive = async( req, res ) => {
    try 
    {
    console.log("GET/marcasactivo")
    
    const response = await Marca.find({ estado: 'Activo' }).populate(
        {
            path: 'usuario',
            select: 'nombre email estado'
        }
    );

    res.status(200).json(response)
    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}


/* ********************************************************************************************* */
// Listar marca por Id
const getById = async(req, res) => {

    try 
    {
        console.log("GET/marcas/", req.params.id);

        const {id} = req.params;
        const query = {_id: id};
        
        const response = await Marca.findById(query);

        res.status(200).json(response);
    } catch (error) {

        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
        
    }
}



/* ********************************************************************************************* */
// Crear marca

const create = async(req, res) => {
    try 
    {
        
        // mostramos lo que enviamos en el cuerpo de la peticion
        console.log("POST/marcas")
        console.log(req.body)

        // declaramos variables para cada atributo de entrada 
        const nombre = req.body.nombre.toUpperCase();
        const estado = req.body.estado;
        const email = req.body.usuario.email;

        
        // validamos que no exista
        const marca = await Marca.findOne({nombre});
        if(marca){
            return res.status(500).json({ mjs: "La marca ya existe" });
        }

        // Validamos que el usuario que se este ingresando exista
        const usuarioExiste = await Usuario.findOne({ email });
        if(!usuarioExiste){
            return res.status(500).json({ mjs: "El usuario no existe" });
        }

        // declaramos un objeto en el que almacenamos el request enviado para pasarselo al metodo crear
        const data = {
            nombre,
            estado,
            usuario: usuarioExiste._id
        }

        // guardamos
        const marcaSave = new Marca(data);

        marcaSave.save();
        
        res.status(201).json(marcaSave);


    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}


/* ********************************************************************************************* */
// Actualizar marca
const update = async(req, res) => {

    try 
    {
        console.log("PUT/marcas/", req.params.id)

        const id = req.params.id

        // Validamos que la marca exista antes de actualizarlo
        let marca = await Marca.findById({ _id: id});
        if(!marca){
            return res.status(404).send("Not found")
        }

        // Declaramos la informacion a actualizar
         const {nombre, estado, usuario } = req.body;

        // Validamons que la marca que este actualizando no exista
        const marcaExiste = await Marca.findOne({nombre: nombre, _id: {$ne: id}});
        if(marcaExiste){
            return res.status(500).send("La marca a actualizar ya existe")
        }

        // validamos de igual forma que ell usuario ingresado existe 
        const usuarioDB = await Usuario.findOne({ email: usuario.email });
        if(!usuarioDB){ return res.status(404).json({mjs: "El usuario no existe"})};
        

        marca.nombre = nombre.toUpperCase();
        marca.estado = estado;
        marca.usuario = usuarioDB._id;

        marca = await marca.save();

        
        console.log(marca)
        res.status(200).json(marca)

        
    } catch (error) {
       
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }

}


/* ********************************************************************************************* */
// Borrar Marca por id estado

const deleteById = async(req, res) => {

    try 
    {
        console.log("DELTE/marcas/",req.params.id)
        
       const { id } = req.params

        const query = {_id: id } 

        // validamos que la marca exista 
        const marcaExist = await Marca.findById(query);
        if(!marcaExist){
            return res.status(404).json({ mjs: "La marca que desea eliminar no existe" });
        }

        const response = await marcaExist.remove();

        res.status(200).json(response);

    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}
module.exports = {getAll, getById, create, update, deleteById, getStateActive }