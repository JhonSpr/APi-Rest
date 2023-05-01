const Animes = require("../database/AnimeModel");

const getAllAnime = (filterParams) => {
  try {
    const getAllAnimes = Animes.getAllAnime(filterParams);
    return getAllAnimes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAnime,
};
