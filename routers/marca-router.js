const router = require('express').Router();


/// Importamos el controllador 
const marcaController = require('../controllers/marca-controller');


// definimos las rutas
router.route('/marcas')
    .get(marcaController.getAll)
    .post(marcaController.create);


router.route('/marcas/:id')
    .get(marcaController.getById)
    .patch(marcaController.update)
    .put(marcaController.update)
    .delete(marcaController.deleteById);


router.route('/marcas-activos')
    .get(marcaController.getStateActive);

module.exports = router;