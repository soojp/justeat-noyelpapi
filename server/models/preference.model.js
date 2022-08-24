const mongoose = require("mongoose");

const PreferenceSchema = new mongoose.Schema(
  {
    zipcode: {
      type: Number,
    },
    distance: {
      type: Number,
    },
    cuisine: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Preference = mongoose.model("Preference", PreferenceSchema);

module.exports = Preference;
