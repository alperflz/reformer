const express = require("express");
const router = express.Router();
const {
  protect,
  protectOptional,
  requireAdmin,
} = require("../middleware/authMiddleware");

const {
  createEnrollment,
  getMyEnrollments,
  getAllEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment,
} = require("../controllers/enrollmentController");

router.post("/", protectOptional, createEnrollment);

router.get("/me", protect, getMyEnrollments);

router.get("/", protect, requireAdmin, getAllEnrollments);
router.put("/:id/status", protect, requireAdmin, updateEnrollmentStatus);
router.delete("/:id", protect, requireAdmin, deleteEnrollment);

module.exports = router;
