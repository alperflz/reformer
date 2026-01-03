const Course = require("../models/Course");
const Program = require("../models/Program");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .populate("program", "title slug level category badgeText")
      .sort({ startDate: 1 });

    res.json({ success: true, courses });
  } catch (err) {
    console.error("getAllCourses error:", err);
    res.status(500).json({ success: false, message: "Kurslar alınamadı" });
  }
};

exports.getCoursesByProgram = async (req, res) => {
  try {
    const courses = await Course.find({ program: req.params.id }).sort({
      startDate: 1,
    });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("program");
    if (!course) return res.status(404).json({ message: "Kurs yok" });

    res.json({ course });
  } catch {
    res.status(500).json({ message: "Kurs alınamadı" });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { program } = req.body;

    const exists = await Program.findById(program);
    if (!exists) return res.status(404).json({ message: "Program yok" });

    const course = await Course.create(req.body);

    res.status(201).json({ course });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Kurs oluşturulamadı" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({ course: updated });
  } catch {
    res.status(500).json({ message: "Kurs güncellenemedi" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: "Kurs silindi" });
  } catch {
    res.status(500).json({ message: "Kurs silinemedi" });
  }
};
