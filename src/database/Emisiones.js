const DB = require("./emisiones.json");

const getAllEmisiones = (filterParams) => {
  try {
    let emisiones = DB.emisiones;
    if (filterParams.mode) {
      return DB.emisiones.filter((emision) =>
        emision.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.name) {
      return DB.emisiones.filter((emision) =>
        emision.name.toLowerCase().includes(filterParams.name)
      );
    }

    return emisiones;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllEmisiones,
};
