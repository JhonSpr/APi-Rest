const DB = require("./db.json");

const getAllFinalizados = (filterParams) => {
  try {
    let finalizados = DB.finalizados;
    if (filterParams.mode) {
      return DB.finalizados.filter((finalizado) =>
        finalizado.mode.toLowerCase().includes(filterParams.mode)
      );
    }

    return finalizados;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllFinalizados,
};
