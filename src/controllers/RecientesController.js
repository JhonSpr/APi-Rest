const DB = require("../database/Recientes.json");

const getAll__Last_Episodes = (res, req) => {
  try {
    let Ultimos_Episodios = DB;
    res.send(Ultimos_Episodios);
  } catch (error) {
    throw {
      status: 500,
      message: error,
    };
  }
};

module.exports = getAll__Last_Episodes;
