const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Program = require("../models/Program");

const createEnrollment = async (req, res) => {
  try {
    const { courseId, name, email, phone, note } = req.body;

    if (!courseId || !name || !email || !phone) {
      return res.status(400).json({
        message: "courseId, name, email, phone zorunludur",
      });
    }

    const course = await Course.findById(courseId).populate("program");
    if (!course) {
      return res.status(404).json({ message: "Kurs bulunamadı" });
    }

    let existingEnrollment;

    if (req.user?.id) {
      existingEnrollment = await Enrollment.findOne({
        course: courseId,
        user: req.user.id,
      });
    } else {
      existingEnrollment = await Enrollment.findOne({
        course: courseId,
        email: email.toLowerCase(),
      });
    }

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Bu kursa daha önce başvuru yapılmış.",
      });
    }

    const enrollment = await Enrollment.create({
      course: course._id,
      program: course.program._id,
      user: req.user?.id || null,
      name,
      email: email.toLowerCase(),
      phone,
      note,
    });

    res.status(201).json({ enrollment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ön kayıt oluşturulamadı" });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const items = await Enrollment.find({ user: req.user.id })
      .populate("course")
      .populate("program", "title slug");

    res.json({ enrollments: items });
  } catch {
    res.status(500).json({ message: "Kayıtlar alınamadı" });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const items = await Enrollment.find()
      .populate("course")
      .populate("program", "title slug")
      .populate("user", "name email phone");

    res.json({ enrollments: items });
  } catch {
    res.status(500).json({ message: "Kayıtlar alınamadı" });
  }
};

const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Geçersiz status" });
    }

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Kayıt yok" });

    enrollment.status = status;
    await enrollment.save();

    res.json({ enrollment });
  } catch {
    res.status(500).json({ message: "Status güncellenemedi" });
  }
};

const deleteEnrollment = async (req, res) => {
  try {
    const item = await Enrollment.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Kayıt yok" });

    res.json({ message: "Kayıt silindi" });
  } catch {
    res.status(500).json({ message: "Kayıt silinemedi" });
  }
};

module.exports = {
  createEnrollment,
  getMyEnrollments,
  getAllEnrollments,
  updateEnrollmentStatus,
  deleteEnrollment,
};
