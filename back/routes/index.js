const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

const app = Express();

// Rutas
const clienteRoutes = require('./cliente-routes');
const categoriaRoutes = require('./categoria-routes');
const serviciosyproductosRoutes = require('./serviciosyproductos-routes');

// use
app.use('/clientes', clienteRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/serviciosyproductos', serviciosyproductosRoutes);
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
