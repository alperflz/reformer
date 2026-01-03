const Blog = require("../models/Blog");

/* GET ALL BLOGS */
exports.getBlogs = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    const blogs = await Blog.find({ isPublished: true })
      .select(
        "title slug excerpt image category author createdAt views isPublished"
      )
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Bloglar listelenemedi" });
  }
};

/* BLOG DETAIL (slug) */
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      isPublished: true,
    });

    if (!blog) return res.status(404).json({ message: "Blog bulunamadı" });

    blog.views += 1;
    await blog.save();

    res.json(blog);
  } catch {
    res.status(500).json({ message: "Blog getirilemedi" });
  }
};

/* CREATE BLOG (WITH IMAGE) */
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      image: req.file ? `/uploads/blogs/${req.file.filename}` : null,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Blog oluşturulamadı" });
  }
};

/* UPDATE BLOG */
exports.updateBlog = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/blogs/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!blog) return res.status(404).json({ message: "Blog bulunamadı" });

    res.json(blog);
  } catch {
    res.status(500).json({ message: "Blog güncellenemedi" });
  }
};

/* DELETE BLOG */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog bulunamadı" });

    res.json({ message: "Blog silindi" });
  } catch {
    res.status(500).json({ message: "Blog silinemedi" });
  }
};

/* RELATED BLOGS */
exports.getRelatedBlogs = async (req, res) => {
  try {
    const { slug } = req.params;

    const currentBlog = await Blog.findOne({ slug, isPublished: true });

    if (!currentBlog) {
      return res.json([]);
    }

    const related = await Blog.find({
      _id: { $ne: currentBlog._id },
      isPublished: true,
      $or: [
        { category: currentBlog.category },
        { tags: { $in: currentBlog.tags || [] } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title slug image createdAt");

    res.json(related);
  } catch (err) {
    console.error("RELATED BLOG ERROR:", err);
    res.status(500).json([]);
  }
};

exports.adminGetBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .select(
        "title slug excerpt image category author createdAt updatedAt views isPublished"
      )
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Admin bloglar listelenemedi" });
  }
};

exports.adminGetBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog bulunamadı" });
    res.json(blog);
  } catch {
    res.status(500).json({ message: "Blog getirilemedi" });
  }
};
