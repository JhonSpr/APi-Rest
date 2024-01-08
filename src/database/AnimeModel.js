const DB = require("./db.json");
const originalData = [...DB.animes];

const getAllAnime = (filterParams) => {
  try {
    const minRating = parseFloat(filterParams.rating);
    const maxRating = minRating + 0.9;

    // Restaurar los datos originales cada vez que se llama a la función
    let animes = [...originalData];

    if (filterParams.info) {
      return animes.filter((anime) => anime.name === filterParams.info);
    }

    if (filterParams.name !== undefined && filterParams.name.trim() !== "") {
      animes = animes.filter((anime) =>
        anime.name.toLowerCase().includes(filterParams.name.toLowerCase()),
      );
    }

    if (filterParams.años) {
      const años = Array.isArray(filterParams.años)
        ? filterParams.años
        : [filterParams.años];

      animes = animes.filter((animeItem) =>
        años.some((año) => animeItem.year == año),
      );
    }

    if (filterParams.estado) {
      animes = animes.filter(
        (anime) => anime.estado === String(filterParams.estado),
      );
    }

    if (filterParams.type) {
      animes = animes.filter(
        (anime) => anime.tipo === String(filterParams.type),
      );
    }

    if (filterParams.episodes) {
      animes = animes.filter(
        (anime) => anime.episodios === String(filterParams.episodes),
      );
    }

    if (filterParams.genero) {
      const generos = Array.isArray(filterParams.genero)
        ? filterParams.genero
        : [filterParams.genero];

      animes = animes.filter((anime) =>
        generos.some((genero) =>
          [
            anime.genero1,
            anime.genero2,
            anime.genero3,
            anime.genero4,
            anime.genero5,
            anime.genero6,
            anime.genero7,
          ].includes(genero.toLowerCase()),
        ),
      );
    }

    if (filterParams.sortBy === "desc") {
      // Ordenar por nombre de manera descendente
      animes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (filterParams.sortBy === "asc") {
      // Ordenar por nombre de manera ascendente
      animes.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filterParams.rating) {
      animes = animes.filter(
        (anime) => anime.rating >= minRating && anime.rating <= maxRating,
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
