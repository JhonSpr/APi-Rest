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
      sortdesc = datos
        .sort((a, b) => b.name.localeCompare(a.name))
        .slice(startIndex, endIndex);
      res.send({
        datos: sortdesc,
        item: datos.length,
        currentPage: page,
        sort: sortBy,
      });
    } else if (sortBy === "asc") {
      sortasc = datos
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(startIndex, endIndex);
      res.send({
        datos: sortasc,
        item: datos.length,
        currentPage: page,
        sort: sortBy,
      });
    } else if (sortBy === "todos") {
      todos = datos.slice(startIndex, endIndex);
      res.send({
        datos: todos,
        item: datos.length,
        currentPage: page,
        sort: sortBy,
      });
    }
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Expires", "0");
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
