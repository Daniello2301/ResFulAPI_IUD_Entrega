const Inventario = require('../models/Inventario');
const Marca = require('../models/Marca');
const EstadoEquipo = require('../models/EstadoEquipo');
const TipoEquipo = require('../models/TipoEquipo');
const Usuario = require('../models/Usuario');



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
        res.status(404).send(err.message);
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
        res.status(404).send(err.message);
    }
};

const getStateActive = async ( req, res ) => {

    try 
    {
        console.log("GET/inventarios-activestate")

        const { id } = req.params;
        const query = { _id: id }
        const response = await Inventario.findById(query).populate(
            {
                path: 'usuario',
                select: 'nombre email estado', 
                match: { estado: 'Activo'}
            },
            {
                path: 'marca',
                select: 'nombre estado', 
                match: { estado: 'Activo' }
            },
            {
                path: 'estadoEquipo',
                select: 'nombre estado', 
                match: { estado: 'Activo' }
            },
            {
                path: 'tipoEquipo',
                select: 'nombre estado', 
                match: { estado: 'Activo' }
            }
        );

        console.log(response);
        res.status(200).json(response)
    } catch (error) {
        
        console.log("Error ", error)
        res.status(404).send(err.message);
    }
};

const create = async ( req, res ) => {

    try 
    {
        console.log("POST/inventarios")
        console.log(req.body)
        
        /* const { modelo, descricion, foto, color, fechaCompra, precio,
                estado } = req.body */
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

        const usaurioDB = await Usuario.findOne({ email });
        if(!usaurioDB) { return res.status(500).json({ mjs: "El usuario no existe" }); }

        const marcaDB = await Marca.findOne({ nombre : marca });
        if(!marcaDB) { return res.status(500).json({ mjs: "La Marca no existe" }); }

        const estadoEquipoDB = await EstadoEquipo.findOne({ nombre: estadoEquipo });
        if(!estadoEquipoDB) { return res.status(500).json({ mjs: "El estado no existe" }); }

        const tipoEquipoDB = await TipoEquipo.findOne({ nombre: tipoEquipo });
        if(!tipoEquipoDB) { return res.status(500).json({ mjs: "El estado no existe" }); }


        const data = { 
        serial, modelo, descripcion, foto, color, fechaCompra, precio, estado,
        usuario: usaurioDB._id,
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
        res.status(404).send(err.message);
    }
}; 

const update = async ( req , res ) => {

    try 
    {
        console.log("PUT/inventarios/",req.params.id)

        const { id } = req.params;

        let inventario = await Inventario.find({_id: id});
        if(!inventario){return res.status(404).json({mjs: "Not foun inventario"})}

        const {serial, ...data} = req.body
    } catch (error) {
        
    }
};

const deleteById = async( req, res) =>{

}

module.exports = {getAll, getById, getStateActive, create, update, deleteById}