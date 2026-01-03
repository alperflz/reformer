const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      req.user = {
        id: decoded.id,
        roles: decoded.roles || [],
      };

      return next();
    } catch (err) {
      console.log("❌ JWT ERROR:", err);
      return res.status(401).json({ message: "Token geçersiz" });
    }
  }

  console.log("⛔ NO TOKEN");
  return res.status(401).json({ message: "Token bulunamadı" });
};

const protectOptional = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      req.user = {
        id: decoded.id,
        roles: decoded.roles || [],
      };

      return next();
    } catch (err) {
      // token hatalı
    }
  }

  next();
};

const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user?.roles) {
      return res.status(401).json({ message: "Yetkisiz erişim" });
    }

    const hasRole = req.user.roles.some((r) => allowedRoles.includes(r));
    if (!hasRole) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
    }

    next();
  };
};

const requireAdmin = requireRole("admin");

module.exports = {
  protect,
  protectOptional,
  requireRole,
  requireAdmin,
};
