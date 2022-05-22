const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    serial:{
        type: String,
        require: true,
        unique: true
    },
    modelo:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    },
    foto:{
        type: String,
        require: true
    },
    color:{
        type: String
    },
    fechaCompra:{
        type: Date,
        require: true
    },
    precio:{
        type: Number,
        require: true
    },
    estado:{
        type: String,
        require: true,
        enum: ['Activo', 'Inactivo']
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        require: true
    },
    marca:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Marca',
        require: true
    },
    estadoEquipo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'EstadoEquipo',
        require: true

    },
    tipoEquipo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'TipoEquipo',
        require: true
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Inventario', InventarioSchema);