const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const { blog, name, message } = req.body;
  const ip = req.ip;

  const existing = await Comment.findOne({
    blog,
    ip,
    createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) },
  });

  if (existing) {
    return res.status(429).json({
      message: "Bu bloga kısa süre içinde tekrar yorum yapamazsınız.",
    });
  }

  const comment = await Comment.create({
    blog,
    name,
    message,
    ip,
  });

  res.status(201).json(comment);
};

exports.getCommentsByBlog = async (req, res) => {
  try {
    const comments = await Comment.find({
      blog: req.params.blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: "Yorumlar listelenemedi",
      error,
    });
  }
};

exports.approveComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({
      message: "Yorum onaylanamadı",
      error,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Yorum bulunamadı" });
    }

    res.json({ message: "Yorum silindi" });
  } catch (error) {
    res.status(500).json({
      message: "Yorum silinemedi",
      error,
    });
  }
};
