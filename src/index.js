const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const v1animeRouter = require("./v1/routes/animeRoutes");
const {swaggerDocs: V1SwaggerDocs} = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3001;
const cache = apicache.middleware;
app.use(cors());
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/animes/", v1animeRouter);
app.get("/generos", (req, res) => {
  // Envía los géneros como respuesta en formato JSON
  res.send({
    generos: [
      {
        id: 1,
        nombre: "Acción",
        link: "/genero/accion",
      },
      {
        id: 2,
        nombre: "Aventura",
        link: "/genero/aventura",
      },
      {
        id: 3,
        nombre: "Comedia",
        link: "/genero/comedia",
      },
      {
        id: 4,
        nombre: "Drama",
        link: "/genero/drama",
      },
      {
        id: 5,
        nombre: "Fantasía",
        link: "/genero/fantasia",
      },
      {
        id: 6,
        nombre: "Mecha",
        link: "/genero/mecha",
      },
      {
        id: 7,
        nombre: "Romance",
        link: "/genero/romance",
      },
      {
        id: 8,
        nombre: "Ciencia ficción",
        link: "/genero/ciencia-ficcion",
      },
      {
        id: 9,
        nombre: "Supernatural",
        link: "/genero/supernatural",
      },
      {
        id: 10,
        nombre: "Suspenso",
        link: "/genero/suspenso",
      },
      {
        id: 11,
        nombre: "Horror",
        link: "/genero/horror",
      },
      {
        id: 12,
        nombre: "Misterio",
        link: "/genero/misterio",
      },
      {
        id: 13,
        nombre: "Psicológico",
        link: "/genero/psicologico",
      },
      {
        id: 14,
        nombre: "Deportes",
        link: "/genero/deportes",
      },
      {
        id: 15,
        nombre: "Música",
        link: "/genero/musica",
      },
      {
        id: 16,
        nombre: "Slice of Life",
        link: "/genero/slice-of-life",
      },
      {
        id: 17,
        nombre: "Harem",
        link: "/genero/harem",
      },
      {
        id: 18,
        nombre: "Histórico",
        link: "/genero/historico",
      },
      {
        id: 19,
        nombre: "Recuentos de vida",
        link: "/genero/recuentos-de-vida",
      },
      {
        id: 20,
        nombre: "Shoujo",
        link: "/genero/shoujo",
      },
      {
        id: 21,
        nombre: "Shounen",
        link: "/genero/shounen",
      },
      {
        id: 22,
        nombre: "Sobrenatural",
        link: "/genero/sobrenatural",
      },
      {
        id: 23,
        nombre: "Vampiros",
        link: "/genero/vampiros",
      },
      {
        id: 23,
        nombre: "Vampiros",
        link: "/genero/vampiros",
      },
      {
        id: 24,
        nombre: "Magia",
        link: "/genero/magia",
      },
      {
        id: 25,
        nombre: "Superpoderes",
        link: "/genero/superpoderes",
      },
      {
        id: 26,
        nombre: "Gore",
        link: "/genero/gore",
      },
      {
        id: 27,
        nombre: "Psychological",
        link: "/genero/psychological",
      },
      {
        id: 28,
        nombre: "Thriller",
        link: "/genero/thriller",
      },
      {
        id: 29,
        nombre: "Space",
        link: "/genero/space",
      },
      {
        id: 30,
        nombre: "Militar",
        link: "/genero/militar",
      },
      {
        id: 31,
        nombre: "Policial",
        link: "/genero/policial",
      },
      {
        id: 32,
        nombre: "Enigma",
        link: "/genero/enigma",
      },
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
