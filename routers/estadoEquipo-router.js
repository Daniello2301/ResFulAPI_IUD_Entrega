const router = require('express').Router();

const estadosController = require('../controllers/estadoEquipo-controller');

// peticiones sin parametros en la URL
router.route('/estados')
    .get(estadosController.getAll)
    .post(estadosController.create);


//Peticiones con parametros en la URL
router.route('/estados/:id')
    .get(estadosController.getById)
    .patch(estadosController.update)
    .put(estadosController.update)
    .delete(estadosController.deleteById);


router.route('/estados-activos')
    .get(estadosController.getStateActive);
    
module.exports = router;