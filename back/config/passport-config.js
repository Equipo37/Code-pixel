const passportJwt = require('passport-jwt');
const db = require('../models');

const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

const PassportStrategy = new StrategyJwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ClaveUltraSecreta'
}, async (jwtPayload, next) => {
    const cliente = await db.Cliente.findByPk(jwtPayload.dni)
    if (cliente) {
        next(false, cliente, null)
    } else {
        next(true, null, null)
    }
})

module.exports = {PassportStrategy}
