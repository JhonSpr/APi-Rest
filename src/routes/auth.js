const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const usersData = require("../db/db.json");
const {
  getUserByUsernameAndPassword,
  generateJwtToken,
} = require("../helpers/authHelpers");

if (!fs.existsSync("./src/db/db.json")) {
  // Crear el archivo con un objeto JSON vacío
  fs.writeFileSync("./src/db/db.json", JSON.stringify({users: []}));
}

const router = express.Router();

// Ruta de registro de usuarios
router.post("/register", (req, res) => {
  // Obtener el usuario y contraseña del cuerpo de la solicitud
  const {username, password, email} = req.body;

  // Leer el archivo JSON
  const db = JSON.parse(fs.readFileSync("./src/db/db.json", "utf-8"));

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = db.users.find((u) => u.username === username);
  if (existingUser) {
    return res
      .status(409)
      .json({message: "El nombre de usuario ya está en uso"});
  }
  // Crear un nuevo usuario
  const newUser = {username, password, email};
  db.users.push(newUser);

  // Guardar los cambios en el archivo JSON
  fs.writeFileSync("./src/db/db.json", JSON.stringify(db));

  // Generar el token JWT
  const token = jwt.sign({username: newUser.username}, "secreto", {
    expiresIn: "1h",
  });

  // Enviar el token en la respuesta
  res.status(201).json({token});
});

// Ruta de login de usuarios
router.post("/login", (req, res) => {
  // Obtener el usuario y contraseña del cuerpo de la solicitud
  const {username, password} = req.body;

  // Leer el archivo JSON
  const db = JSON.parse(fs.readFileSync("./src/db/db.json", "utf-8"));

  // Buscar el usuario en la base de datos
  const user = db.users.find(
    (u) => u.username === username && u.password === password,
  );
  // Verificar si el usuario existe
  if (!user) {
    return res
      .status(401)
      .json({message: "Nombre de usuario o contraseña incorrectos"});
  }

  // Generar el token JWT
  const token = jwt.sign(
    {username: user.username, email: user.email},
    "secreto",
    {
      expiresIn: "1h",
    },
  );

  // Enviar el token en la respuesta
  res.status(200).json({token, username: user.username, email: user.email});
});

module.exports = router;
