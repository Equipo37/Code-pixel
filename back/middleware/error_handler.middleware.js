const logger = require('../utils/winston.logger');

// eslint-disable-next-line consistent-return,func-names
const handler = function (err, req, res, next) {
  const { extendBase, status } = err;
  logger.api.error(err);

  if (extendBase) {
    res.status(status|| 400);
    res.json({
        message: err.message,
      }
    );
  } else {
    // Manejar aquí errores que no sean de BaseException si es necesario.
    res.status(500);
    res.json({
      error: {
        message: 'Error Interno del Servidor'
      }
    });
  }
};


module.exports.handler = handler;
