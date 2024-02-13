import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/postroutes.js";

const app = express();
dotenv.config(); //to access env file  declared variable

connectDB();
app.use(cors()); //to initiate cors feature;
app.use(express.json()); //to convert data type  of incoming request from Frontend to json format
app.use(express.urlencoded({ extended: true })); //To handle the URL encoded data parmeters like form filling data
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Welcome To Express Server");
});

app.listen(5000, () => {
  console.log("server started in 5000");
});
