const router = require('express').Router();

const usuarioController = require('../controllers/usuario-controller');

router.route('/usuarios')
    .get(usuarioController.getAll)
    .post(usuarioController.create);


router.route('/usuarios/:id')
    .get(usuarioController.getById)
    .patch(usuarioController.update)
    .put(usuarioController.update)
    .delete(usuarioController.deleteById);

router.route('/usuarios-activos')
    .get(usuarioController.getByActiveUser);

module.exports = router;