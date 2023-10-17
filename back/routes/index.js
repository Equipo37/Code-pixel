const Express = require('express');

// Middlewares:
const rootPath = require('../middleware/root_path.middleware');
const errors = require('../middleware/error_handler.middleware');

const app = Express();

// Rutas
const clienteRoutes = require('./cliente-routes');
const categoriaRoutes = require('./categoria-routes');
const serviciosyproductosRoutes = require('./serviciosyproductos-routes');
const eventoRoutes = require('./evento-routes')
const reservaRoutes = require('./reserva-routes')

// use
app.use('/clientes', clienteRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/syp', serviciosyproductosRoutes);
app.use('/eventos', eventoRoutes);
app.use('/reservas', reservaRoutes);
app.use('/', rootPath.handler);
app.use(rootPath.setHeaders);
app.use(errors.handler);

module.exports = app;
