import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  salt: {type:String},
  apiKey: { type: String, default:null }
});

const UserModel = mongoose.model("users", schema);
export default UserModel;
