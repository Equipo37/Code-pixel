const passport = require("passport");
const jwt = require("jsonwebtoken");
const clienteServices = require("../services/clientes-services");
const { NotAuthorized } = require("../exceptions/cliente-exceptions");

const isAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, cliente, info) => {
    if (err || !cliente) {
      const error = new NotAuthorized("Cliente no autorizado");
      return next(error);
    }
    next();
  })(req, res, next);
};

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secretKey = "ClaveUltraSecreta";
  const decodedToken = jwt.verify(token, secretKey);
  const dni = decodedToken.dni;
  try {
    const response = await clienteServices.getByDni(dni);
    if (response == "Cliente no encontrado") {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    if (!response.cli_admin) {
      const error = new NotAuthorized("No tienes permisos de administrador");
      return next(error);
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { isAuthenticated, isAdmin };
