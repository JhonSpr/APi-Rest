const emisiones = require("../database/Emisiones");

const getAllEmisiones = (filterParams) => {
  try {
    const AllEmisiones = emisiones.getAllEmisiones(filterParams);
    return AllEmisiones;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmisiones,
};
