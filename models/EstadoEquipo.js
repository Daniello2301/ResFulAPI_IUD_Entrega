const mongoose = require('mongoose');

const EstadoEquipoSchema = mongoose.Schema({

    nombre:{
        type: String,
        require : [true, 'El Nombre Requerido']
    },
    estado:{
        type: String,
        require: [true, "El estado es requerido ( 'Activo' o 'Inactivo' ) "],
        enum:['Activo', 'Inactivo']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: [true, "El usuario es requerido"]
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('EstadoEquipo', EstadoEquipoSchema);