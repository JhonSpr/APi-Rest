const animeService = require("../services/AnimeService");

const getAllAnimes = (req, res) => {
  const { name, estado, info } = req.query;
  try {
    // Tu lógica para obtener los datos de la base de datos o donde sea
    const limit = parseInt(req.query.limit) || 24;
    const page = parseInt(req.query.page) || 1;
    // ... otras variables

    // Obtener datos de anime usando animeService
    const animes = animeService.getAllAnime({
      name,
      años: req.query.años,
      estado,
      episodes: req.query.episodes,
      genero: req.query.genero,
      type: req.query.type,
      info,
      rating: req.query.rating,
      sortBy: req.query.sortBy,
    });

    // Ordenar los datos
    let datos = animes;
    function sortByRating(sortOrder) {
      if (sortOrder === "asc") {
        return datos.slice().sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOrder === "desc") {
        return datos.slice().sort((a, b) => b.name.localeCompare(a.name));
      } else {
        return datos.slice();
      }
    }

    // Verificar y enviar los datos ordenados
    if (req.query.sortBy) {
      const sortedAnimes = sortByRating(req.query.sortBy);
      res.send({
        datos: sortedAnimes,
        item: sortedAnimes.length,
        currentPage: page,
        sorty: req.query.sortBy,
      });
    } else {
      // Si no se proporciona un sortBy, enviar los datos sin orden
      res.send({
        datos,
        item: datos.length,
        currentPage: page,
        sorty: req.query.sortBy,
      });
    }
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "Algo salió mal",
      data: [],
    });
  }
};

module.exports = {
  getAllAnimes,
};
