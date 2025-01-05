import UserModel from "../models/user.js";

import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;
export const userControllers = {
  userRegister: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      if (!userName) throw new Error("userName is required!");
      if (!email) throw new Error("email is required!");
      if (!password) throw new Error("password is required!");

      const checkPassword = await UserModel.findOne({ email });
      if (checkPassword) throw new Error("Password already exists");

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);
      const createdUser = await UserModel.create({
        userName,
        email,
        password: hashPassword,
        salt,
      });
      res.status(201).send({
        data: createdUser,
        message: "Register successful!",
        success: true,
      });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("email is required!");
      if (!password) throw new Error("password is required!");
      const account = await UserModel.findOne({ email });
      if (!account) throw new Error("Email không tồn tại");
      const hashPasssword = bcrypt.hashSync(password, account.salt);
      if (hashPasssword !== account.password) {
        throw new Error("Mật khẩu không đúng");
      }
      const randomString = uuidv4();
      const apiKey = `mern-$${account.id}$-$${account.email}$-$${randomString}$`;
      account.apiKey = apiKey
      await account.save();
      res.status(201).send({ message: "Đăng nhập thành công" });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },
};
