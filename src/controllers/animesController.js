const workoutService = require("../services/workoutService");

const getAllAnimes = (req, res) => {
  const { mode, name } = req.query;
  try {
    const allWorkouts = workoutService.getAllAnimes({ mode, name });
    res.send(allWorkouts);
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};
module.exports = {
  getAllAnimes,
};
