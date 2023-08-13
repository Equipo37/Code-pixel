const express = require('express');

const router = express.Router();
const SypControllers = require('../controllers/serviciosyproductos-controllers');

router.get('/', SypControllers.getAll);
router.post('/', SypControllers.add);
router.get('/:id', SypControllers.getById);
router.put('/', SypControllers.edit);
router.delete('/:id', SypControllers.deleteProductoServicio);
router.get('/categoria/:id', SypControllers.getByCategoriaId);
module.exports = router;
