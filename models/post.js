import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true,default: Date.now() },
  updatedAt: { type: Date, required: true,default: Date.now() },
});

const PostModel = mongoose.model("posts", schema);
export default PostModel;
