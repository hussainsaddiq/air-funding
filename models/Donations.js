const { Schema, model, Types } = require("mongoose");
const DonationSchema = Schema(
  {
    product: { type: Types.ObjectId, ref: "project" },
    // user: { type: Types.ObjectId, ref: "user" },
    donation: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = model("donation", DonationSchema);
