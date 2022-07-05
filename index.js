import express from "express";
import bodyPraser from "body-parser";
import connectToServer from "./src/models/server.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/post_routes.js";
import categoryRoutes from "./src/routes/category_routes.js";
import authenticationMiddleware from "./src/middlewares/authentication_middleware.js";
const app = express();
const port = 5000;
app.use(bodyPraser.json());
app.search(bodyPraser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", authenticationMiddleware, categoryRoutes);
app.use("/api/v1/post", authenticationMiddleware, postRoutes);
app.get("/", (req, res) => {
  var error = new Error("ha ha ha");
  error.statusCode = 401;
  throw error;
});

app.use((err, req, res, next) => {
  try {
    res.status(err.statusCode).json({
      error: err.message,
    });
  } catch (error) {
    res.status(401).json({
      error: err.message,
    });
  }
});

app.listen(port, async () => {
  try {
    var res = await connectToServer();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("Listening to port:  " + port);
});
