const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {
  addComment,
  getCommentsByBlog,
  approveComment,
  deleteComment,
} = require("../controllers/commentController");

const commentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dk
  max: 5,
  message: "Çok fazla yorum gönderdiniz. Lütfen bekleyin.",
});

router.post("/", commentLimiter, addComment);

router.get("/blog/:blogId", getCommentsByBlog);

router.put("/:id/approve", approveComment);

router.delete("/:id", deleteComment);

module.exports = router;
