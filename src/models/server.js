import mongoose from "mongoose";
//mongodb://127.0.0.1:27017
const mongoAtlasUri =
  "mongodb+srv://utsav:jnBkNCiDOjKBCEaJ@cluster0.x9hdx.mongodb.net/?retryWrites=true&w=majority";
//
const connectToServer = async () => {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      "mongodb://127.0.0.1:27017/clickmind",
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
};
export default connectToServer;
