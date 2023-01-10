const animes = require("../database/animes");

const getAllAnimes = (filterParams) => {
  try {
    const AllAnimes = animes.getAllAnimes(filterParams);
    return AllAnimes;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAnimes,
};
