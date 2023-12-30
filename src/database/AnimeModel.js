const DB = require("./db.json");

const getAllAnime = (filterParams) => {
  try {
    const minRating = parseFloat(filterParams.rating);
    const maxRating = minRating + 0.9;
    let animes = DB.animes;
    if (filterParams.info) {
      return DB.animes.filter((anime) => anime.name === filterParams.info);
    }
    if (filterParams.name !== undefined && filterParams.name.trim() !== "") {
      return DB.animes.filter((anime) =>
        anime.name.toLowerCase().includes(filterParams.name.toLowerCase()),
      );
    } else {
      return DB.animes; // Devuelve todos los animes si el query está vacío
    }
    if (filterParams.años) {
      return DB.animes.filter(
        (anime) => anime.year === Number(filterParams.años),
      );
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
