const express = require("express");
const apicache = require("apicache");
const cors = require("cors");
const v1animeRouter = require("./v1/routes/animeRoutes");
const {swaggerDocs: V1SwaggerDocs} = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 3001;
const cache = apicache.middleware;
app.use(cors());
app.use(express.json());
app.use(cache("2 minutes"));
app.use("/api/v1/animes/", v1animeRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
