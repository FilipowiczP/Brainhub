import mongoose from "mongoose";

const connectToMongoose = async () => {
  //    === LOCAL DATABASE ===
  const url = `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  await mongoose.connect(url);
};

export default connectToMongoose;
