const router = require('express').Router();

const tipoController = require('../controllers/tipoEquipo-controller');


router.route('/tiposequipo')
    .get(tipoController.getAll)
    .post(tipoController.create);

router.route('/tiposequipo/:id')
    .get(tipoController.getById)
    .patch(tipoController.update)
    .put(tipoController.update)
    .delete(tipoController.deleteById);

router.route('/tiposequipo-usauriosactivos')
    .get(tipoController.getUsersActive);


module.exports = router;