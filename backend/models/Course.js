
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    time: { type: String },

    location: { type: String, default: "Kadıköy / İstanbul" },

    capacity: { type: Number, default: 20 },

    price: { type: Number },

    isActive: { type: Boolean, default: true },
    isOpenForApply: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
