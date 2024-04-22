import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
app.use("/record", records);
const PORT = process.env.PORT || 5050;
// start the Express server
mongoose.connect(process.env.ATLAS_URI)
.then(() =>
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  })
)
.catch((err)=> console.log(err.message));