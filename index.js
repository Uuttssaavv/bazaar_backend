import express from "express";
import bodyPraser from "body-parser";
import connectToServer from "./src/models/server.js";
import UserController from "./src/conroller/userController.js";
const app = express();
const router = express.Router();
const port = 5000;
app.use(bodyPraser.json());
app.search(bodyPraser.urlencoded({ extended: true }));
const uc = new UserController();
app.use("/user/create", uc.createUser);

app.use("/user/get", uc.getUser);

app.listen(port, async () => {
  try {
    var res = await connectToServer();
    console.log(res);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log("Listening to port:  " + port);
});
