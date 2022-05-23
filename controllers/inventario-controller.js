const Inventario = require('../models/Inventario');
const Marca = require('../models/Marca');
const EstadoEquipo = require('../models/EstadoEquipo');
const TipoEquipo = require('../models/TipoEquipo');
const Usuario = require('../models/Usuario');

const { validarInventario }  = require('../helpers/inventario-validate')


// listar todos los inventarios
const getAll = async( req, res ) => {

    try 
    {
        const response = await Inventario.find().populate([
        {
            path:'usuario',
            select: 'nombre email estado'
        },
        {
            path:'marca',
            select: 'nombre estado'
        },
        {
            path:'estadoEquipo',
            select: 'nombre estado'
        },
        {
            path:'tipoEquipo',
            select: 'nombre estado'
        }])

        console.log("GET/inventarios")
        res.status(200).json(response);

    } catch (error) {
        
        
        console.log("Error ", error)
        res.status(404).json({msj: error.message}).send("Ocurrió un error")
    }
};


// listamos un elementro por di
const getById = async( req, res ) => {

    try 
    {
     const { id } = req.params;
    
     const response = await Inventario.findById({_id: id}).populate(
         {
             path: 'usaurio',
             select: 'nombre email estado '
         }
     );

     console.log("GET/intentarios/",id);
     res.status(200).json(response);

    } catch (error) {
        
        console.log("Error ", error)
        res.status(404).json({msj: error.message}).send("Ocurrió un error")
    }
};

const getStateActive = async ( req, res ) => {

    try 
    {
        console.log("GET/inventarios-activestate")

        const response = await Inventario.find({estado: 'Activo'}).populate([
            {
                path: 'usuario',
                select: 'nombre email estado'
            },
            {
                path: 'marca',
                select: 'nombre estado'
            },
            {
                path: 'estadoEquipo',
                select: 'nombre estado'
            },
            {
                path: 'tipoEquipo',
                select: 'nombre estado'
            }
        ]);

        console.log(response);
        res.status(200).json(response)
    } catch (error) {
        
        console.log("Error ", error)
        res.status(404).json({msj: error.message}).send("Ocurrió un error")
    }
};

const create = async ( req, res ) => {

    try 
    {
        console.log("POST/inventarios")
        console.log(req.body)
        

        // Validaciones 
        const validaciones = validarInventario(req);

        if(validaciones.length > 0){
            return res.status(500).send(validaciones);
        }

        // Request
        const serial = req.body.serial;
        const modelo = req.body.descricion;
        const descripcion = req.body.descripcion;
        const foto = req.body.foto;
        const color = req.body.color;
        const fechaCompra = req.body.fechaCompra;
        const precio = req.body.precio;
        const estado = req.body.estado;
        const email = req.body.usuario.email;
        const marca = req.body.marca.nombre.toUpperCase();
        const estadoEquipo = req.body.estadoEquipo.nombre.toUpperCase();
        const tipoEquipo = req.body.tipoEquipo.nombre.toUpperCase();

        // validaciones
        let inventario = await Inventario.findOne({serial : serial});
        if(inventario) return res.status(500).json({ mjs: "El serial ya existe" });

        const usuarioDB = await Usuario.findOne({ email: email});
        if(!usuarioDB) { return res.status(500).json({ mjs: "El usuario no existe" }); }

        const marcaDB = await Marca.findOne({ nombre : marca });
        if(!marcaDB) { return res.status(500).json({ mjs: "La Marca no existe" }); }

        const estadoEquipoDB = await EstadoEquipo.findOne({ nombre: estadoEquipo });
        if(!estadoEquipoDB) { return res.status(500).json({ mjs: "El estado no existe" }); }

        const tipoEquipoDB = await TipoEquipo.findOne({ nombre: tipoEquipo });
        if(!tipoEquipoDB) { return res.status(500).json({ mjs: "El estado no existe" }); }


        const data = { 
        serial, modelo, descripcion, foto, color, fechaCompra, precio, estado,
        usuario: usuarioDB._id,
        marca: marcaDB._id,
        estadoEquipo: estadoEquipoDB._id,
        tipoEquipo: tipoEquipoDB._id
        }

        const inventarioSave = new Inventario(data);

        inventarioSave.save()

        console.log(inventarioSave)
        res.status(201).json(inventarioSave)

    } catch (error) {
        
        console.log("Error ", error)
        res.status(404).json({msj: error.message}).send("Ocurrió un error")
    }
}; 

const update = async ( req , res ) => {

    try 
    {
        // Validaciones 
        const validaciones = validarInventario(req);

        if(validaciones.length > 0){
            return res.status(500).send(validaciones);
        }
        
        console.log("PUT/inventarios/",req.params.id)

        const { id } = req.params;

        let inventario = await Inventario.findById({_id: id});
        if(!inventario){return res.status(404).json({mjs: "Not foun inventario"})}

        const {serial, modelo, descripcion, foto, color, fechaCompra,
            precio, estado, usuario, marca, estadoEquipo, tipoEquipo } = req.body

        
        const inventarioExiste = await Inventario.findOne({serial: serial, _id: {$ne: id}});
         if(inventarioExiste){ return res.status(500).json({mjs: "El iventario existe"})}

        
        const usuarioDB = await Usuario.findOne({ email : usuario.email});
        if(!usuarioDB) { return res.status(404).json({mjs: "El usuario no existe"})}

        const marcaDB = await Marca.findOne({nombre: marca.nombre.toUpperCase()});
        if(!marcaDB) { return res.status(404).json({mjs: "La marca no existe"})}

        const estadoDB = await EstadoEquipo.findOne({nombre: estadoEquipo.nombre.toUpperCase()});
        if(!estadoDB) { return res.status(404).json({mjs: "El estado de equipo no existe"})}

        const tipoDB = await TipoEquipo.findOne({nombre: tipoEquipo.nombre.toUpperCase()});
        if(!tipoDB) { return res.status(404).json({mjs: "El Tipo de equipo no existe"})}

    
        inventario.serial = serial;
        inventario.modelo = modelo;
        inventario.descripcion = descripcion;
        inventario.foto = foto;
        inventario.color = color;
        inventario.fechaCompra = fechaCompra;
        inventario.precio = precio;
        inventario.estado = estado;
        inventario.usuario = usuarioDB._id;
        inventario.marca = marcaDB._id;
        inventario.estadoEquipo = estadoDB._id;
        inventario.tipoEquipo = tipoDB._id;

        inventario = await inventario.save();

        console.log(inventario);
        res.status(202).json(inventario);

    } catch (error) {
        console.log("Error ", error)
        res.status(500).json({msj: error.message}).send("Ocurrió un error", error.message)
    }
};

const deleteById = async( req, res) =>{

    try {
        
        console.log("DELETE/inventario",req.params.id);
        const { id } = req.params;

        const inventarioExiste = await Inventario.findById({_id: id});
        if(!inventarioExiste){
            return res.status(404).json({ mjs: "El inventario que desea eliminar no existe" });
        }

        const response = await inventarioExiste.remove();

        res.status(200).json(response);
    } catch (error) {
        
        console.log("Error ", error)
        res.status(500).json({mjs: error.message}).send("Ocurrió un error", error.message);
    }
}

module.exports = {getAll, getById, getStateActive, create, update, deleteById}