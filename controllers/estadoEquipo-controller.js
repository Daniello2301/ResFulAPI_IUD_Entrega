const EstadoEquipo = require('../models/EstadoEquipo');

const Usuario = require('../models/Usuario')



/* ********************************************************************************************* */
// Listar todos los estados de equipos

const getAll = async(req, res) => {

    try 
    {
        console.log("GET/estadosequipos")
        const response = await EstadoEquipo.find({}).populate(
            {
                path:'usuario',
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





/* ******************************************************************************************** */
// istar estado activos
const getStateActive = async( req, res ) => {
    try 
    {
    console.log("GET/estadoActivo")
    
    const response = await EstadoEquipo.find({ estado: 'Activo' }).populate(
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
// Listar estado por Id
const getById = async(req, res) => {

    try 
    {
        console.log("GET/estadosequipo/", req.params.id);

        const {id} = req.params;
        const query = {_id: id};
        
        const response = await EstadoEquipo.findById(query);

        res.status(200).json(response);
    } catch (error) {

        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
        
    }
}



/* ********************************************************************************************* */
// Crear estado equipo

const create = async(req, res) => {
    try 
    {
        
        // mostramos lo que enviamos en el cuerpo de la peticion
        console.log("POST/estadosequipos")
        console.log(req.body)

        // declaramos variables para cada atributo de entrada 
        const nombre = req.body.nombre.toUpperCase();
        const estado = req.body.estado;
        const email = req.body.usuario.email;

        
        // validamos que no exista
        const estadoEquipo = await EstadoEquipo.findOne({nombre});
        if(estadoEquipo){
            return res.status(500).json({ mjs: "El Estado ya existe" });
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
        const estadoEquipoSave = new EstadoEquipo(data);

        estadoEquipoSave.save();
        
        res.status(201).json(estadoEquipoSave);


    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}


/* ********************************************************************************************* */
// Actualizar estado
const update = async(req, res) => {

    try 
    {
        console.log("PUT/estadosequipo/", req.params.id)

        const id = req.params.id

        // Validamos que estado exista antes de actualizarlo
        let estadoEquipo = await EstadoEquipo.findById({ _id: id});
        if(!estadoEquipo){
            return res.status(404).send("Not found")
        }

        // Declaramos la informacion a actualizar
         const {nombre, estado} = req.body;

        // Validamons que el estado que este actualizando no exista
        const estadoExiste = await EstadoEquipo.findOne({nombre: nombre, _id: {$ne: id}});
        if(estadoExiste){
            return res.status(500).send("El estado a actualizar ya existe")
        }

        // validamos de igual forma que ell usuario ingresado existe 
        const usuarioDB = await Usuario.findOne({ email: req.body.usuario.email });
        if(!usuarioDB){ return res.status(404).json({mjs: "El usuario no existe"})};
        

        estadoEquipo.nombre = nombre.toUpperCase();
        estadoEquipo.estado = estado;
        estadoEquipo.usuario = usuarioDB._id;

        estadoEquipo = await estadoEquipo.save();

        
        console.log(estadoEquipo)
        res.status(200).json(estadoEquipo)

        
    } catch (error) {
       
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }

}


/* ********************************************************************************************* */
// Borrar estado por id estado

const deleteById = async(req, res) => {

    try 
    {
        console.log("DELTE/estadosequipo/",req.params.id)
        
       const { id } = req.params

        const query = {_id: id } 

        // validamos que el estado exista 
        const estadoExist = await EstadoEquipo.findById(query);
        if(!estadoExist){
            return res.status(404).json({ mjs: "El estado que desea eliminar no existe" });
        }

        const response = await estadoExist.remove();

        res.status(200).json(response);

    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error")
    }
}
module.exports = {getAll, getById, create, update, deleteById, getStateActive }