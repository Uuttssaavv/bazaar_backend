import mongoose from "mongoose";
const mongoAtlasUri =
  "mongodb+srv://utsav:Bz8l84QhlBjLBkwI@cluster0.x9hdx.mongodb.net/?retryWrites=true&w=majority";
//
const connectToServer = async () => {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(
      mongoAtlasUri,

      () => console.log(" Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
};
export default connectToServer;
