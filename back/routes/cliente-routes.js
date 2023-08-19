const express = require('express');

const router = express.Router();
const ClienteControllers = require('../controllers/cliente-controllers');
const { isAuthenticated, isAdmin } = require('../middleware/middlewares');

router.get('/', isAuthenticated, isAdmin, ClienteControllers.getAllClientes);
router.post('/', ClienteControllers.signUpCliente);
router.get('/:dni', isAuthenticated, ClienteControllers.getByDniCliente);
router.put('/:dni', isAuthenticated, ClienteControllers.editCliente);
router.delete('/:dni', isAuthenticated, isAdmin, ClienteControllers.deleteCliente);
router.post('/login', ClienteControllers.login);

module.exports = router;
