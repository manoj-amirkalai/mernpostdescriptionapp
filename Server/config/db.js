import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`db connected ${connected.connection.host}`);
  } catch (err) {
    console.log(`Error message:  ${err.message}`);
    process.exit(1);
  }
};
export default connectDB;
