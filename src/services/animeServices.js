const animes = require("../database/animes");

const getAllAnimes = (filterParams) => {
  try {
    const AllANIMES = animes.getAllAnimes(filterParams);
    return AllANIMES;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAnimes,
};
