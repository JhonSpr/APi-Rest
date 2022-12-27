const DB = require("./db.json");

const getAllFinalizados = (filterParams) => {
  try {
    let finalizados = DB.finalizados;
    if (filterParams.mode) {
      return DB.finalizados.filter((finalizado) =>
        finalizado.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.name) {
      return DB.finalizados.filter((finalizado) =>
        finalizado.name.toLowerCase().includes(filterParams.name)
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
