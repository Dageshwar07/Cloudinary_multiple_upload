import express from "express";
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import  userRouter from "./routes/userRouter.js"
import {dbConnection}  from "./database/connection.js";
// Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const PORT = 4000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.get("/", (req, res) => {
  res.send("hello")})

app.use("/api/v1/user", userRouter);
dbConnection();

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});


export default app;
