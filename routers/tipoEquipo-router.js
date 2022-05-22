const router = require('express').Router();

const tipoController = require('../controllers/tipoEquipo-controller');


router.route('/tipos')
    .get(tipoController.getAll)
    .post(tipoController.create);

router.route('/tipos/:id')
    .get(tipoController.getById)
    .patch(tipoController.update)
    .put(tipoController.update)
    .delete(tipoController.deleteById);

router.route('/tipos-activos')
    .get(tipoController.getUsersActive);


module.exports = router;