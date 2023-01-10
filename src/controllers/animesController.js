const workoutService = require("../services/workoutService");

const getAllAnimes = (req, res) => {
  const { mode, estado } = req.query;
  try {
    const allWorkouts = workoutService.getAllWorkouts({ mode, estado });
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
