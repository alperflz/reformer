const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },

    category: { type: String, index: true },
    tags: [{ type: String, index: true }],

    image: String,
    excerpt: String,

    content: { type: String, required: true }, 

    author: { type: String, default: "Re:Form Akademi" },

    isPublished: { type: Boolean, default: true },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
