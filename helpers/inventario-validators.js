const inventarioValidator = (req) => {

    const validations = [];

    if(!req.body.serial)
    {
        validations.push("Serial requerido!!");
    }

    if(!req.body.modelo)
    {
        validations.push("Modelo es requerido!!")
    }

    return validations;
}

module.exports = {inventarioValidator}