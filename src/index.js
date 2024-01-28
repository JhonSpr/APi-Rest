const express = require("express");
const cors = require("cors");
const v1animeRouter = require("./v1/routes/animeRoutes");
const db = require("./database/Recientes.json");
const DB = require("./database/db.json");
const app = express();
const PORT = process.env.PORT || 3001;
app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use("/api/v1/animes/", v1animeRouter);
app.use("/api/v1/recien-agregados", (req, res) => {
  res.send({ recientes: db.recientes });
});

app.put("/api/v1/animes/:id/rating", (req, res) => {
  const animeId = req.params.id;
  const rating = parseFloat(req.body.rating);

  // Verifica si el rating es un número válido
  if (!isNaN(rating)) {
    // Encuentra el anime por su ID en tu base de datos y actualiza el rating
    const anime = DB.animes.find((anime) => anime.id === animeId);

    if (anime) {
      anime.rating = rating;
      res.send({ message: "Rating actualizado correctamente." });
    } else {
      res.status(404).send({ error: "Anime no encontrado." });
    }
  } else {
    res.status(400).send({ error: "El rating no es un número válido." });
  }
});
const agregarNuevoAnime = (req, res) => {
  try {
    const nuevoAnime = req.body;
    DB.animes.push(nuevoAnime);

    res
      .status(201)
      .send({ message: "Anime agregado correctamente", anime: nuevoAnime });
  } catch (error) {
    console.error("Error al agregar el anime:", error);
    res.status(500).send({ error: "Error interno del servidor" });
  }
};
app.post("/api/v1/animes/add", agregarNuevoAnime);
app.use("/api/v1/recien-agregados", (req, res) => {
  res.send({ recientes: db.recientes });
});
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  app, PORT;
});
