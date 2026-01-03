const express = require("express");
const router = express.Router();
const {
  protect,
  requireAdmin,
} = require("../middleware/authMiddleware");

const {
  uploadCover,
  uploadGallery,
} = require("../middleware/uploadMiddleware");

const {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  uploadCoverImage,
  uploadGalleryImages,
  getProgramBySlug,
} = require("../controllers/programController");

router.get("/", getPrograms);
router.get("/:id", getProgramById);
router.get("/slug/:slug", getProgramBySlug);


router.post("/", protect, requireAdmin, createProgram);
router.put("/:id", protect, requireAdmin, updateProgram);
router.delete("/:id", protect, requireAdmin, deleteProgram);

router.put(
  "/:id/cover",
  protect,
  requireAdmin,
  uploadCover.single("cover"),
  uploadCoverImage
);

router.post(
  "/:id/gallery",
  protect,
  requireAdmin,
  uploadGallery.array("gallery", 10),
  uploadGalleryImages
);

module.exports = router;
