const passport = require('passport');
const { NotAuthorized } = require('../exceptions/cliente-exceptions');

const isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, cliente, info) => {
        if (err || !cliente) {
            const error = new NotAuthorized('Cliente no autorizado')
            return next(error)
        }
        next()
    }) (req, res, next)
}

module.exports = {isAuthenticated}