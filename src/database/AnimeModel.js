const { sortData } = require("../controllers/AnimeController");
const DB = require("./db.json");
const originalData = [...DB.animes];
const getAllAnime = (filterParams) => {
  try {
    const minRating = parseFloat(filterParams.rating);
    const maxRating = minRating + 0.9;
    let animes = [...originalData];
    if (filterParams.info) {
      return DB.animes.filter((anime) => anime.name === filterParams.info);
    } else if (
      filterParams.name !== undefined &&
      filterParams.name.trim() !== ""
    ) {
      return DB.animes.filter((anime) =>
        anime.name.toLowerCase().includes(filterParams.name.toLowerCase()),
      );
    }
    if (filterParams.años) {
      const años = Array.isArray(filterParams.años)
        ? filterParams.años
        : [filterParams.años];

      return DB.animes.filter((animeItem) => {
        return años.some((año) => {
          return animeItem.year == año;
        });
      });
    }

    if (filterParams.estado) {
      return DB.animes.filter(
        (anime) => anime.estado == String(filterParams.estado),
      );
    }
    if (filterParams.type) {
      return DB.animes.filter(
        (anime) => anime.tipo == String(filterParams.type),
      );
    }
    if (filterParams.episodes) {
      return DB.animes.filter(
        (anime) => anime.episodios == String(filterParams.episodes),
      );
    }
    if (filterParams.genero) {
      const generos = Array.isArray(filterParams.genero)
        ? filterParams.genero
        : [filterParams.genero];

      return DB.animes.filter((anime) => {
        return generos.some((genero) => {
          return [
            anime.genero1,
            anime.genero2,
            anime.genero3,
            anime.genero4,
            anime.genero5,
            anime.genero6,
            anime.genero7,
          ].includes(genero.toLowerCase());
        });
      });
    }

    if (filterParams.sortBy == "desc" && filterParams.sortBy !== "todos") {
      return DB.animes.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (filterParams.sortBy == "asc" && filterParams.sortBy !== "todos") {
      return DB.animes.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filterParams.rating) {
      return DB.animes.filter(
        (anime) => anime.rating >= minRating && anime?.rating <= maxRating,
      );
    }

    return animes;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllAnime,
};
