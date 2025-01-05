import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userControllers } from "./controllers/user.js";
import { postController } from "./controllers/post.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import {authPutMiddleware} from "./middlewares/authPutMiddleware.js"
dotenv.config();
mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Kết nối Database thành công");
});
const app = express();
app.use(express.json());

app.post("/api/users/register", userControllers.userRegister);
app.post("/api/users/login", userControllers.userLogin);

app.post("/api/posts", authMiddleware, postController.postCreated);
app.put("/api/posts/:id", authPutMiddleware, postController.postUpdate);

app.listen(8080, () => {
  console.log("Hello World");
});
