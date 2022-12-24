const express = require("express");
const apicache = require("apicache");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const API_URL = process.env.API_URL || 3000;
const cache = apicache.middleware;

app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts/", v1WorkoutRouter);

app.listen(API_URL, () => {
  console.log(`🚀 Server listening on port ${API_URL}`);
  V1SwaggerDocs(app, API_URL);
});
