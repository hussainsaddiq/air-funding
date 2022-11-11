const { Schema, model, Types } = require("mongoose");
const projectSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    message: {
      type: String,
    },
    donations: [{ type: Types.ObjectId, ref: "donation" }],
    user: { type: Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);
module.exports = model("project", projectSchema);
