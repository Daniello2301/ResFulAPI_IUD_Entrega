const inventarioValidator = (req) => {

    const validations = [];

    if(!req.body.serial){
        validaciones.push('El serial es requerido');
    }
    if(!req.body.modelo){
        validaciones.push('El modelo es requerido');
    }
    if(!req.body.descripcion){
        validaciones.push('El descriocion es requerido');
    }
    if(!req.body.foto){
        validaciones.push('El foto es requerido');
    }
    if(!req.body.fechaCompra){
        validaciones.push('La fecha de Compra es requerida ( aaa-mm-dd )');
    }
    if(!req.body.precio){
        validaciones.push('El precio es requerido');
    }
    if(!req.body.estado){
        validaciones.push('El estado es requerido ( Activo o Inactivo )');
    }
    if(!req.body.usuario){
        validaciones.push('El Usuario es requerido');
    }
    if(!req.body.marca){
        validaciones.push('La marca es requerido');
    }
    if(!req.body.estadoEquipo){
        validaciones.push('El estado del equipo es requerido');
    }
    if(!req.body.tipoEquipo){
        validaciones.push('El tipo del equipo es requerido');
    }

    return validations;
}

module.exports = {inventarioValidator}