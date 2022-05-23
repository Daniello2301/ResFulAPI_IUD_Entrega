const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    serial:{
        type: String,
        require: [true, " EL serial es requerido "],
        unique: [true, "El serial ya existe, debe ser único"]
    },
    modelo:{
        type: String,
        require: [true, "El modelo es requerido"]
    },
    descripcion:{
        type: String,
        require: [true, "La descripcion es requerida"]
    },
    foto:{
        type: String,
        require: [true, "La foto es requerida"]
    },
    color:{
        type: String
    },
    fechaCompra:{
        type: Date,
        require: [true, "La fecha de Compra es requerida ( aaa-mm-dd )"]
    },
    precio:{
        type: Number,
        require: [true, "El precio es requerido"]
    },
    estado:{
        type: String,
        require: [true, "El estado es requerido ( Activo o Inactivo )"],
        enum: ['Activo', 'Inactivo']
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        require: [true, "El usuario es requerido (email)"]
    },
    marca:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Marca',
        require: [true, "La marca es requerida"]
    },
    estadoEquipo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'EstadoEquipo',
        require: [true, "El estado de equipo es requerido"]

    },
    tipoEquipo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TipoEquipo',
        require: [true, "El tipo de equipo es requerido"]
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Inventario', InventarioSchema);