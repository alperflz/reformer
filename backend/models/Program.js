
const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: { type: String, required: true, unique: true, lowercase: true },

    desc: String,
    overview: String,

    badge: {
      icon: { type: String, default: "bi-star" },
      label: { type: String, default: "Eğitim Programı" },
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgramCategory",
    },

    level: { type: String, default: "Seviye 1" },
    price: { type: Number, default: 0 }, 
    badgeText: String,

    coverImage: String,

    gallery: [
      {
        src: String,
        alt: String,
      },
    ],

    outcomes: [String],

    curriculum: [
      {
        title: { type: String, required: true },
        desc: String,
      },
    ],

    whoCanJoin: [String],

    info: [
      {
        label: String,
        value: String,
      },
    ],

    faq: [
      {
        q: String,
        a: String,
      },
    ],

    isPublished: { type: Boolean, default: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
