const express = require("express");
const animeController = require("../../controllers/AnimeController");
const router = express.Router();
const fs = require("fs");

router
  .get("/", animeController.getAllWorkouts)
  .get("/:workoutId", animeController.getOneWorkout)
  .post("/", animeController.createNewWorkout)
  .patch("/:workoutId", animeController.updateOneWorkout)
  .put("/:id", (req, res) => {
    fs.readFile("../../database/db.json", "utf-8", (err, data) => {
      if (err) {
        return res.status(500).send({error: "Error reading products file"});
      }

      const products = JSON.parse(data);
      const product = products.find((p) => p.id === req.params.id);

      if (!product) {
        return res.status(404).send({error: "Product not found"});
      }

      product.name = req.body.name;
      product.price = req.body.price;

      fs.writeFile(
        "../../database/db.json",
        JSON.stringify(products),
        (writeErr) => {
          if (writeErr) {
            return res.status(500).send({error: "Error writing products file"});
          }

          return res.send({message: "Product updated successfully"});
        },
      );
    });
  })
  .delete("/:workoutId", animeController.deleteOneWorkout);

module.exports = router;
