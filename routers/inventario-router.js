const router = require('express').Router();

const inventarioController = require('../controllers/inventario-controller');


router.route('/inventarios')
    .get(inventarioController.getAll)
    .post(inventarioController.create);

router.route('/inventarios/:id')
    .get(inventarioController.getById)
    .patch(inventarioController.update)
    .put(inventarioController.update)
    .delete(inventarioController.deleteById);

router.route('/inventarios-activos')
    .get(inventarioController.getStateActive);

module.exports = router;