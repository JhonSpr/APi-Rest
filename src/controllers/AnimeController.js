const animeService = require("../services/AnimeService");

const getAllAnimes = (req, res) => {
  const { name, estado, info } = req.query;
  try {
    const limit = parseInt(req.query.limit) || 24;
    const page = parseInt(req.query.page) || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const años = req.query.años;
    const episodes = req.query.episodes;
    const genero = req.query.genero;
    const type = req.query.type;
    const rating = req.query.rating;
    const sortBy = req.query.sortBy;
    const animes = animeService.getAllAnime({
      name,
      años,
      estado,
      episodes,
      genero,
      type,
      info,
      rating,
      sortBy,
    });

    let datos = animes;

    if (sortBy === "desc") {
      datos = datos
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(startIndex, endIndex);
    } else if (sortBy === "asc") {
      datos = datos
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(startIndex, endIndex);
    } else if (sortBy === undefined || sortBy === null || sortBy === "todos") {
      datos = datos.slice(startIndex, endIndex);
    }
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Expires", "0");
    res.send({
      datos: datos,
      item: datos.length,
      currentPage: page,
      sort: sortBy,
    });
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
