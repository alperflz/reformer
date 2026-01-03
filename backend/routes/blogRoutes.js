const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const blogCtrl = require("../controllers/blogController");

router.get("/", blogCtrl.getBlogs);
router.get("/:slug", blogCtrl.getBlogBySlug);
router.get("/:slug/related", blogCtrl.getRelatedBlogs);
router.get("/admin/all", blogCtrl.adminGetBlogs);
router.get("/admin/:id", blogCtrl.adminGetBlogById);

router.post("/", upload.single("image"), blogCtrl.createBlog);
router.put("/:id", upload.single("image"), blogCtrl.updateBlog);
router.delete("/:id", blogCtrl.deleteBlog);

module.exports = router;
