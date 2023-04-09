const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const v1animeRouter = require("./v1/routes/animeRoutes");
const {swaggerDocs: V1SwaggerDocs} = require("./v1/swagger");
const authRoutes = require("./routes/auth");
const fs = require("fs");
const usersData = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;
const cache = apicache.middleware;
app.use(cors());
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/animes/", v1animeRouter);
app.get("/generos", (req, res) => {
  res.send({
    generos: [
      {
        id: 1,
        nombre: "Acción",
        link: "/generos/accion",
      },
      {
        id: 2,
        nombre: "Aventura",
        link: "/generos/aventura",
      },
      {
        id: 3,
        nombre: "Comedia",
        link: "/generos/comedia",
      },
      {
        id: 4,
        nombre: "Drama",
        link: "/generos/drama",
      },
      {
        id: 5,
        nombre: "Fantasía",
        link: "/generos/fantasia",
      },
      {
        id: 6,
        nombre: "Mecha",
        link: "/generos/mecha",
      },
      {
        id: 7,
        nombre: "Romance",
        link: "/generos/romance",
      },
      {
        id: 8,
        nombre: "Ciencia ficción",
        link: "/generos/ciencia-ficcion",
      },
      {
        id: 9,
        nombre: "Sobrenatural",
        link: "/generos/sobrenatural",
      },
      {
        id: 10,
        nombre: "Terror",
        link: "/generos/terror",
      },
      {
        id: 11,
        nombre: "Horror",
        link: "/generos/horror",
      },
      {
        id: 12,
        nombre: "Misterio",
        link: "/generos/misterio",
      },
      {
        id: 13,
        nombre: "Psicológico",
        link: "/generos/psicologico",
      },
      {
        id: 14,
        nombre: "Deportes",
        link: "/generos/deportes",
      },
      {
        id: 15,
        nombre: "Isekai",
        link: "/generos/isekai",
      },
      {
        id: 17,
        nombre: "Harem",
        link: "/generos/harem",
      },
      {
        id: 18,
        nombre: "Histórico",
        link: "/generos/historico",
      },
      {
        id: 20,
        nombre: "Shoujo",
        link: "/generos/shoujo",
      },
      {
        id: 21,
        nombre: "Shounen",
        link: "/generos/shounen",
      },
      {
        id: 23,
        nombre: "Vampiros",
        link: "/generos/vampiros",
      },
      {
        id: 24,
        nombre: "Magia",
        link: "/generos/magia",
      },
      {
        id: 26,
        nombre: "Gore",
        link: "/generos/gore",
      },
      {
        id: 30,
        nombre: "Militar",
        link: "/generos/militar",
      },
      {
        id: 32,
        nombre: "Enigma",
        link: "/generos/enigma",
      },
    ],
  });
});

app.use("/auth", authRoutes);
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization"); // Obtiene el token del encabezado de autorización

  if (!token) {
    return res.status(403).json({message: "Acceso denegado"}); // Si no hay token, se niega el acceso
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: "Token inválido"}); // Si el token es inválido, se devuelve un error
    }

    req.user = decoded.user; // Decodifica el token y agrega los datos del usuario en el objeto de solicitud
    next(); // Continúa con el siguiente middleware o ruta
  });
};

app.get("/users", (req, res) => {
  const db = JSON.parse(fs.readFileSync("./src/db/db.json", "utf-8"));
  res.send(db);
});
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = usersData.users.find((user) => user.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: "Usuario no encontrado"});
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
