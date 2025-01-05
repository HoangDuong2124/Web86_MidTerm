import UserModel from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
    const apiKey = req.query.apiKey;
  
    if (!apiKey) {
      return res.status(401).json({ error: "Thiếu apiKey" });
    }
  
    try {
      // Tìm người dùng theo apiKey
      const user = await UserModel.findOne({ apiKey });
      if (!user) {
        return res.status(403).json({ error: "apiKey không hợp lệ" });
      }
  
      // Gắn thông tin user vào request
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi xác thực apiKey" });
    }
  };
  