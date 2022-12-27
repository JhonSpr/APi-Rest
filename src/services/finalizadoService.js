const finalizados = require("../database/Finalizados");

const getAllFinalizados = (filterParams) => {
  try {
    const AllFinalizados = finalizados.getAllFinalizados(filterParams);
    return AllFinalizados;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllFinalizados,
};
