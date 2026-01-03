const User = require("../models/User");
const Enrollment = require("../models/Enrollment");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("-password -refreshTokenHash")
      .lean();

    const enrollments = await Enrollment.find({ user: userId });

    const stats = {
      totalEnrollments: enrollments.length,
      approvedEnrollments: enrollments.filter((e) => e.status === "approved")
        .length,
      pendingEnrollments: enrollments.filter((e) => e.status === "pending")
        .length,
    };

    res.json({
      success: true,
      user: {
        ...user,
        stats,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Sunucu hatası" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, bio, phone } = req.body;

    // Başka kullanıcıda aynı email var mı?
    const emailExists = await User.findOne({
      email,
      _id: { $ne: req.user.id },
    });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Bu e-posta adresi başka bir kullanıcıya ait.",
      });
    }

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, bio, phone },
      { new: true, runValidators: true }
    ).select("-password -refreshTokenHash");

    res.json({ success: true, user: updated });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(400).json({
      success: false,
      message: "Profil güncellenirken hata oluştu",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Yeni şifre en az 6 karakter olmalıdır",
      });
    }

    const user = await User.findById(req.user.id);
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Mevcut şifre yanlış",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Şifre başarıyla güncellendi",
    });
  } catch (err) {
    console.error("updatePassword error:", err);
    res.status(500).json({
      success: false,
      message: "Şifre güncellenemedi",
    });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Dosya yüklenmedi",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: `/uploads/avatars/${req.file.filename}` },
      { new: true }
    ).select("-password -refreshTokenHash");

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("updateAvatar error:", err);
    res.status(500).json({
      success: false,
      message: "Avatar güncellenemedi",
    });
  }
};
