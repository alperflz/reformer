const express = require("express");
const router = express.Router();
const { protect, requireAdmin } = require("../middleware/authMiddleware");

const {
  getAllCourses,
  getCoursesByProgram,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.get("/", getAllCourses);
router.get("/program/:id", getCoursesByProgram);

router.get("/:id", protect, requireAdmin, getCourseById);
router.post("/", protect, requireAdmin, createCourse);
router.put("/:id", protect, requireAdmin, updateCourse);
router.delete("/:id", protect, requireAdmin, deleteCourse);

module.exports = router;
