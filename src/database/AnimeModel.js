const e = require("express");
const DB = require("./db.json");
const {saveToDatabase} = require("./utils");

const getAllAnime = (filterParams) => {
  try {
    let animes = DB.animes;
    if (filterParams.name) {
      return DB.animes.filter((workout) =>
        workout.name.includes(filterParams.name.toLowerCase()),
      );
    }

    if (filterParams.year) {
      return DB.animes.filter(
        (anime) => anime.year === Number(filterParams.year),
      );
    }
    if (filterParams.estado) {
      return DB.animes.filter(
        (anime) => anime.estado == String(filterParams.estado),
      );
    }
    if (filterParams.tipo) {
      return DB.animes.filter(
        (anime) => anime.mode == String(filterParams.tipo),
      );
    }
    if (filterParams.episodes) {
      return DB.animes.filter(
        (anime) => anime.episodios == String(filterParams.episodes),
      );
    }
    if (filterParams.genero) {
      return DB.animes.filter(
        (anime) =>
          anime.genero1 == String(filterParams.genero.toLowerCase()) ||
          anime.genero2 == String(filterParams.genero.toLowerCase()) ||
          anime.genero3 == String(filterParams.genero.toLowerCase()) ||
          anime.genero4 == String(filterParams.genero.toLowerCase()) ||
          anime.genero5 == String(filterParams.genero.toLowerCase()) ||
          anime.genero6 == String(filterParams.genero.toLowerCase()) ||
          anime.genero7 == String(filterParams.genero.toLowerCase()),
      );
    }

    return animes;
  } catch (error) {
    throw {status: 500, message: error};
  }
};

module.exports = {
  getAllAnime,
};
