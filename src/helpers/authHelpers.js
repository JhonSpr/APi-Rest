const jwt = require("jsonwebtoken");
const dbPath = require("../db/db.json");

// Obtener un usuario por su nombre de usuario y contraseña
const getUserByUsernameAndPassword = (username, password) => {
  const user = dbPath.get("users").find({username, password}).value();
  return user;
};

// Generar un token JWT
const generateJwtToken = (user) => {
  const token = jwt.sign({id: user.id, username: user.username}, "secreto", {
    expiresIn: "1h",
  });
  return token;
};

module.exports = {getUserByUsernameAndPassword, generateJwtToken};
