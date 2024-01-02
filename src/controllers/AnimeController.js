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
    const animes = animeService.getAllAnime({
      name,
      años,
      estado,
      episodes,
      genero,
      type,
      info,
      rating,
    });

    let datos = animes;

    res.send({
      datos: datos.slice(startIndex, endIndex),
      item: datos.length,
      currentPage: page,
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
