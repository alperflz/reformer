const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");
const Enrollment = require("../models/Enrollment");

const setRefreshCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  roles: user.roles,
  avatar: user.avatar,
  phone: user.phone,
  bio: user.bio,
  status: user.status,
  createdAt: user.createdAt,
});

const register = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Tüm alanlar zorunludur" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(400)
        .json({ message: "Bu email ile kayıtlı kullanıcı zaten var" });

    const user = await User.create({
      name,
      email,
      password,
      roles: roles?.length ? roles : ["user"],
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    setRefreshCookie(res, refreshToken);

    return res.status(201).json({
      user: sanitizeUser(user),
      accessToken,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Email veya şifre hatalı" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Email veya şifre hatalı" });

    if (user.status === "banned")
      return res.status(403).json({ message: "Hesabınız engellenmiştir" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    setRefreshCookie(res, refreshToken);

    return res.json({
      user: sanitizeUser(user),
      accessToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};


const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "-password -refreshTokenHash"
    );

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const statsAgg = await Enrollment.aggregate([
      {
        $match: {
          user: user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          approvedEnrollments: {
            $sum: {
              $cond: [{ $eq: ["$status", "approved"] }, 1, 0],
            },
          },
          pendingEnrollments: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const stats = statsAgg[0] || {
      totalEnrollments: 0,
      approvedEnrollments: 0,
      pendingEnrollments: 0,
    };

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar,
      phone: user.phone,
      status: user.status,
      createdAt: user.createdAt,
      stats,
    });
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = { getMe };

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token yok" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Geçersiz oturum" });

    const match = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!match) return res.status(401).json({ message: "Token eşleşmedi" });

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    setRefreshCookie(res, newRefreshToken);

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    return res
      .status(401)
      .json({ message: "Geçersiz veya süresi dolmuş refresh token" });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.JWT_REFRESH_SECRET
        );
        const user = await User.findById(decoded.id);
        if (user) {
          user.refreshTokenHash = null;
          await user.save();
        }
      } catch {}
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res.json({ message: "Çıkış yapıldı" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Mevcut şifre yanlış" });
    }

    user.password = newPassword;
    await user.save();

    return res.json({ message: "Şifre başarıyla güncellendi" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  logout,
  updatePassword,
};
