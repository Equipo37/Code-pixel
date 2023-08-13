const express = require('express');

const router = express.Router();
const ClienteControllers = require('../controllers/cliente-controllers');
const { isAuthenticated } = require('../middleware/middlewares');

router.get('/', isAuthenticated, ClienteControllers.getAllClientes);
router.post('/', ClienteControllers.signUpCliente);
router.get('/:dni', isAuthenticated, ClienteControllers.getByDniCliente);
router.put('/', isAuthenticated, ClienteControllers.editCliente);
router.delete('/:dni', isAuthenticated, ClienteControllers.deleteCliente);
router.post('/login', ClienteControllers.login);

module.exports = router;
