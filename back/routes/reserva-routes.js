const express = require('express');

const router = express.Router();
const ReservaControllers = require('../controllers/reserva-controllers');
const { isAuthenticated, isAdmin } = require('../middleware/middlewares');

router.get('/', isAuthenticated, ReservaControllers.getAllReservas);
router.post('/', isAuthenticated, ReservaControllers.addReserva);
router.get('/cliente/:dni', isAuthenticated, ReservaControllers.getReservaByDni);
router.get('/:id', isAuthenticated, ReservaControllers.getReservaById)


module.exports = router;
