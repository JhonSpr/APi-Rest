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
app.get("/api/v1/recien-agregados", (req, res) => {
  res.send({
    recientes: [
      {
        id: 1,
        nombre: "Mashle",
        link: "/ver/mashle-5",
        image:
          "https://image.tmdb.org/t/p/w300/kGWzULYc0GgdQaKFIMFNmM7COFq.jpg",
        episode: "Episodio 5",
      },
      {
        id: 2,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-5",
        image:
          "https://image.tmdb.org/t/p/w300/7DvvdeA0bY3VIhicNYRuD19W28N.jpg",
        episode: "Episodio 5",
      },
      {
        id: 3,
        nombre: "Fairy gone",
        link: "/ver/fairy-gone-tv-12",
        image:
          "https://image.tmdb.org/t/p/w300/sAvSITbps270l1hYtSQ57W7O1F8.jpg",
        episode: "Episodio 12",
      },
      {
        id: 4,
        nombre: "Mashle",
        link: "/ver/mashle-6",
        image:
          "https://image.tmdb.org/t/p/w300/lDvllafdpBKHxsyPKUsfLlEI2vn.jpg",
        episode: "Episodio 6",
      },
      {
        id: 5,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-6",
        image:
          "https://image.tmdb.org/t/p/w300/o0HAhA3zeNsPQPtAnoigJlpCCuk.jpg",
        episode: "Episodio 6",
      },
      {
        id: 6,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-7",
        image: "https://cloudfront-cdn-images.com/9fna1n946am8.jpg",
        episode: "Episodio 7",
      },
      {
        id: 7,
        nombre: "Mashle",
        link: "/ver/mashle-7",
        image: "https://cloudfront-cdn-images.com/q546idbtkmj2.jpg",
        episode: "Episodio 7",
      },
      {
        id: 8,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-8",
        image:
          "https://image.tmdb.org/t/p/w300/twKgIalhN0PeahBx8mwk8UaMhvh.jpg",
        episode: "Episodio 8",
      },
      {
        id: 9,
        nombre: "Mashle",
        link: "/ver/mashle-8",
        image:
          "https://image.tmdb.org/t/p/w300/94Jx029j907EIqxZXbslIDcW07X.jpg",
        episode: "Episodio 8",
      },
      {
        id: 10,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-9",
        image:
          "https://image.tmdb.org/t/p/w300/6EgVImJC0fn0jshgw12NHRf5Rzd.jpg",
        episode: "Episodio 9",
      },
      {
        id: 11,
        nombre: "Mashle",
        link: "/ver/mashle-9",
        image: "https://cloudfront-cdn-images.com/yd48nalhhn0k.jpg",
        episode: "Episodio 9",
      },
      {
        id: 12,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-10",
        image:
          "https://image.tmdb.org/t/p/w300/iKD90AUxGHcLHGvbuSKfqq76rbE.jpg",
        episode: "Episodio 10",
      },
      {
        id: 13,
        nombre: "Kimetsu no yaiba katanakaji no sato-hen",
        link: "/ver/kimetsu-no-yaiba:-katanakaji-no-sato-hen-11",
        image: "https://cloudfront-cdn-images.com/eqga6jxi9ke2.jpg",
        episode: "Episodio 11",
      },
      // {
      //   id: 14,
      //   nombre: "Deportes",
      //   link: "/generos/deportes",
      // },
      // {
      //   id: 15,
      //   nombre: "Isekai",
      //   link: "/generos/isekai",
      // },
      // {
      //   id: 17,
      //   nombre: "Harem",
      //   link: "/generos/harem",
      // },
      // {
      //   id: 18,
      //   nombre: "Histórico",
      //   link: "/generos/historico",
      // },
      // {
      //   id: 20,
      //   nombre: "Shoujo",
      //   link: "/generos/shoujo",
      // },
      // {
      //   id: 21,
      //   nombre: "Shounen",
      //   link: "/generos/shounen",
      // },
      // {
      //   id: 23,
      //   nombre: "Vampiros",
      //   link: "/generos/vampiros",
      // },
      // {
      //   id: 24,
      //   nombre: "Magia",
      //   link: "/generos/magia",
      // },
      // {
      //   id: 26,
      //   nombre: "Gore",
      //   link: "/generos/gore",
      // },
      // {
      //   id: 30,
      //   nombre: "Militar",
      //   link: "/generos/militar",
      // },
      // {
      //   id: 32,
      //   nombre: "Enigma",
      //   link: "/generos/enigma",
      // },
    ],
  });
});
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
