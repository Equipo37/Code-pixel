const express = require('express');

const router = express.Router();
const EventoControllers = require('../controllers/evento-controllers');
const { isAuthenticated } = require('../middleware/middlewares');

router.get('/', isAuthenticated, EventoControllers.getAllEventos);
router.post('/', isAuthenticated, EventoControllers.addEvento);
router.get('/:id', isAuthenticated, EventoControllers.getEventoById);


module.exports = router;
