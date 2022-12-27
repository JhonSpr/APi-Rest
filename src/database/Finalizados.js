const DB = require("./db.json");

const getAllFinalizados = (filterParams) => {
  try {
    let finalizados = DB.finalizados;
    if (filterParams.estado) {
      return DB.finalizados.filter((finalizado) =>
        finalizado.name.toLowerCase().includes(filterParams.estado)
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
