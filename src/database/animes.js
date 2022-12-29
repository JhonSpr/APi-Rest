const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllAnimes = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      return DB.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.name) {
      return DB.workouts.filter((workout) =>
        workout.name.toLowerCase().includes(filterParams.name)
      );
    }

    return workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
module.exports = {
  getAllAnimes,
};
