const ProgramCategory = require("../models/ProgramCategory");

exports.getCategories = async (req, res) => {
  try {
    const categories = await ProgramCategory.find().sort({ order: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Kategori listelenemedi", error });
  }
};


exports.createCategory = async (req, res) => {
  try {
    const category = await ProgramCategory.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Kategori oluşturulamadı", error });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const category = await ProgramCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Kategori bulunamadı" });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Kategori güncellenemedi", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await ProgramCategory.findByIdAndDelete(req.params.id);

    if (!category)
      return res.status(404).json({ message: "Kategori bulunamadı" });

    res.json({ message: "Kategori silindi" });
  } catch (error) {
    res.status(500).json({ message: "Kategori silinemedi", error });
  }
};
