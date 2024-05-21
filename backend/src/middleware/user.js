const jwt = require("jsonwebtoken");

// Middleware para verificar o token JWT
function verifyToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Token de autorização não fornecido." });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido ou expirado." });
    }
    req.userId = decoded.userId;
    req.userEmail = decoded.userEmail;
    req.userName = decoded.userName;
    next();
  });
}

module.exports = { verifyToken };