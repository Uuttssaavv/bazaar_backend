import express from "express";
import bodyPraser from "body-parser";
import connectToServer from "./src/models/server.js";
import userRoutes from "./src/routes/userRoutes.js";
const app = express();
const port = 5000;
app.use(bodyPraser.json());
app.search(bodyPraser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);

app.listen(port, async () => {
  try {
    var res = await connectToServer();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("Listening to port:  " + port);
});
