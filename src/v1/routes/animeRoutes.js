const express = require("express");
const animeController = require("../../controllers/AnimeController");

const router = express.Router();

router
  .get("/", animeController.getAllWorkouts)
  .get("/:workoutId", animeController.getOneWorkout)
  .post("/", animeController.createNewWorkout)
  .patch("/:workoutId", animeController.updateOneWorkout)
  .delete("/:workoutId", animeController.deleteOneWorkout);

module.exports = router;
