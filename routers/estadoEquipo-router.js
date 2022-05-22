const router = require('express').Router();

const estadosController = require('../controllers/estadoEquipo-controller');

// peticiones sin parametros en la URL
router.route('/estadosequipo')
    .get(estadosController.getAll)
    .post(estadosController.create);


//Peticiones con parametros en la URL
router.route('/estadosequipo/:id')
    .get(estadosController.getById)
    .patch(estadosController.update)
    .put(estadosController.update)
    .delete(estadosController.deleteById);

module.exports = router;