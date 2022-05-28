const mongoose = require('mongoose');

const TipoEquipSchema = mongoose.Schema({

    nombre:{
        type: String,
        require : [true, "El nombre es requerido"]
    },
    estado:{
        type: String,
        require: [true,  "El estado es requerido ( Activo o Inactivo )"],
        enum:['Activo', 'Inactivo']
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require:[true, "El usuario es requerido (email)"]
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('TipoEquipo', TipoEquipSchema);