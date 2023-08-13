const express = require('express');

const router = express.Router();
const CategoriaControllers = require('../controllers/categoria-controllers');

router.get('/', CategoriaControllers.getAllCategorias);
router.get('/:id', CategoriaControllers.getByIdCategoria);

module.exports = router;
