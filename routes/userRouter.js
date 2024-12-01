import express from "express";
import {

  uploadfile,
  uploadfileMultiple

} from "../controller/userController.js";

const router = express.Router();

router.post("/upload", uploadfile);
router.post("/upload-multiple", uploadfileMultiple);


export default router;
