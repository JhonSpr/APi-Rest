const emisiones = require("../database/Emisiones");

const getAllEmisiones = (filterParams) => {
  try {
    const allWorkouts = Workout.getAllEmisiones(filterParams);
    return allWorkouts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmisiones,
};
