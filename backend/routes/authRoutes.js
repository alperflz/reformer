
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  register,
  login,
  getMe,
  refreshToken,
  logout,
} = require("../controllers/authController");
const { protect, requireAdmin } = require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  updatePassword,
  updateAvatar,
} = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: "uploads/avatars",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);


router.get("/me", protect, getMe);

router.get("/profile", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/password", protect, updatePassword);
router.put("/update-avatar", protect, upload.single("avatar"), updateAvatar);

router.get("/admin/health-check", protect, requireAdmin, (req, res) => {
  res.json({ message: "Admin panel endpoint erişilebilir." });
});

module.exports = router;
