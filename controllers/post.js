import PostModel from "../models/post.js";

export const postController = {
  postCreated: async (req, res) => {
    try {
      const userId = req.user._id;
      const { content } = req.body;
      if (!content) throw new Error("Content is required!");
      const postCreated = await PostModel.create({ userId, content });
      res.status(201).send({
        data: postCreated,
        message: "Post successful!",
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

  postUpdate: async (req, res) => {
    try {
      const postId = req.params.id; // Lấy id từ params
      const { content } = req.body; // Nội dung mới từ body
      const userId = req.user._id; // Lấy userId từ middleware

      if (!content) {
        return res.status(400).json({ error: "Nội dung mới là bắt buộc" });
      }
      // Tìm bài post trong cơ sở dữ liệu
      const post = await PostModel.findById(postId);
      console.log(post)
      if (!post) {
        return res.status(404).json({ error: "Bài post không tồn tại" });
      }

      // Kiểm tra quyền sở hữu bài post
      if (post.userId.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ error: "Không có quyền cập nhật bài post này" });
      }

      // Cập nhật bài post
      post.content = content;
      post.updatedAt = Date.now();
      await post.save();

      res.status(200).json({
        message: "Cập nhật bài post thành công",
        post,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật bài post" });
    }
  },
};
