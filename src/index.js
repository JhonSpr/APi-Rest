const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1EmisionesRouter = require("./v1/routes/emisionesRoutes");
const v1FinalizadosRouter = require("./v1/routes/finalizadosRoutes");
const v1AnimesRouter = require("./v1/routes/animesRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT;
const cache = apicache.middleware;
app.use(cors());
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/workouts/", v1WorkoutRouter);
app.use("/api/v1/emisiones/", v1EmisionesRouter);
app.use("/api/v1/finalizados/", v1FinalizadosRouter);
app.use("/api/v1/animes/", v1AnimesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
