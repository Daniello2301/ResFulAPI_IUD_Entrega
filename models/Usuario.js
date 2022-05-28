const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({

    nombre:{
        type: String, 
        require : [true, "El nombre es requerido"]
    },
    email:{
        type: String,
        require: [true, "El email es requerido"],
        unique: [true, "El email ya existe"]
    },
    estado:{
        type: String,
        require:[true,  "El estado es requerido ( Activo o Inactivo )"],
        enum:['Activo', 'Inactivo']
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Usuario', UsuarioSchema);