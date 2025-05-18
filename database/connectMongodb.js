import mongoose from "mongoose";

const connetMongodb = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("(Connect to Mongodb) successfully");
};

export default connetMongodb;
