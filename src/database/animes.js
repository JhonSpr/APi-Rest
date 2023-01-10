const DB = require("./animes.json");
const { saveToDatabase } = require("./utils");
const getAllAnimes = (filterParams) => {
  try {
    let animes = DB.animes;
    if (filterParams.mode) {
      return DB.animes.filter((anime) =>
        anime.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.name) {
      return DB.animes.filter((anime) =>
        anime.name.toLowerCase().includes(filterParams.name)
      );
    }
    return animes;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
module.exports = {
  getAllAnimes,
};
