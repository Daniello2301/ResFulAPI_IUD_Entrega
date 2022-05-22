const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({

    nombre:{
        type: String, 
        require : true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    estado:{
        type: String,
        require: true,
        enum:['Activo', 'Inactivo']
    }
},
{
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Usuario', UsuarioSchema);