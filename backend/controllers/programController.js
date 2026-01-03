const Program = require("../models/Program");
const slugify = require("slugify");

const generateUniqueSlug = async (title) => {
  let baseSlug = slugify(title, { lower: true, strict: true, locale: "tr" });
  let slug = baseSlug;
  let counter = 1;

  while (await Program.findOne({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};

const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({ isPublished: true }).sort({
      createdAt: -1,
    });

    res.json({ programs });
  } catch (err) {
    res.status(500).json({ message: "Programlar alınamadı" });
  }
};

const getProgramById = async (req, res) => {
  try {
    const item = await Program.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Program bulunamadı" });

    res.json({ program: item });
  } catch {
    res.status(500).json({ message: "Program alınamadı" });
  }
};

const getProgramBySlug = async (req, res) => {
  try {
    const program = await Program.findOne({ slug: req.params.slug });

    if (!program) {
      return res.status(404).json({ message: "Program bulunamadı" });
    }

    res.json({ program });
  } catch (err) {
    res.status(500).json({ message: "Server hata", error: err.message });
  }
};


const createProgram = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title) {
      return res.status(400).json({ message: "title zorunludur" });
    }

    const slug = await generateUniqueSlug(data.title);

    const program = await Program.create({
      ...data,
      slug,
      createdBy: req.user?.id,
    });

    res.status(201).json({ program });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Program oluşturulamadı" });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program yok" });

    if (req.body.title && req.body.title !== program.title) {
      req.body.slug = await generateUniqueSlug(req.body.title);
    }

    Object.assign(program, req.body);
    await program.save();

    res.json({ program });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Program güncellenemedi" });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const deleted = await Program.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Program yok" });

    res.json({ message: "Program silindi" });
  } catch (err) {
    res.status(500).json({ message: "Program silinemedi" });
  }
};

const uploadCoverImage = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program yok" });

    if (!req.file) {
      return res.status(400).json({ message: "Cover dosyası gerekli" });
    }

    program.coverImage = "/" + req.file.path.replace(/\\/g, "/");
    await program.save();

    res.json({ coverImage: program.coverImage });
  } catch (err) {
    res.status(500).json({ message: "Cover yüklenemedi" });
  }
};

const uploadGalleryImages = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) return res.status(404).json({ message: "Program yok" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Galeri dosyaları gerekli" });
    }

    const images = req.files.map((file) => ({
      src: "/" + file.path.replace(/\\/g, "/"),
      alt: req.body.alt || program.title,
    }));

    program.gallery.push(...images);
    await program.save();

    res.json({ gallery: program.gallery });
  } catch (err) {
    res.status(500).json({ message: "Galeri yüklenemedi" });
  }
};

module.exports = {
  getPrograms,
  getProgramById,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deleteProgram,
  uploadCoverImage,
  uploadGalleryImages,
  
};
