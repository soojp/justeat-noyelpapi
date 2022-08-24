const Preference = require("../models/preference.model");

module.exports = {
  getPreferences: (req, res) => {
    Preference.find({})
      .then((preferences) => {
        res.json(preferences);
      })
      .catch((err) => {
        console.log("ERROR getting all preferences", err);
        res.status(400).json({
          message: "something went wrong finding all preferences",
          error: err,
        });
      });
  },
  getPreferenceById: (req, res) => {
    Preference.findOne({ _id: req.params.id })
      .then((preference) => {
        res.json(preference);
      })
      .catch((err) => {
        console.log("ERROR getting preference", err);
        res.status(400).json({
          message: "something went wrong finding preference",
          error: err,
        });
      });
  },
  createPreference: (req, res) => {
    Preference.create(req.body)
      .then((newPreference) => {
        res.status(201).json(newPreference);
      })
      .catch((err) => {
        console.log("ERROR creating preference", err);
        res.status(400).json({
          message: "something went wrong creating preference",
          error: err,
        });
      });
  },
  updatePreference: (req, res) => {
    console.log(`updating --backend ${req.params.id}`);
    Preference.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((preference) => {
        res.json(preference);
      })
      .catch((err) => {
        console.log("ERROR updating preference", err);
        res.status(400).json({
          message: "something went wrong updating preference",
          error: err,
        });
      });
  },
  deletePreference: (req, res) => {
    Preference.deleteOne({ _id: req.params.id })
      .then((preference) => {
        res.json(preference);
      })
      .catch((err) => {
        console.log("ERROR deleting preference", err);
        res.status(400).json({
          message: "something went wrong deleting preference",
          error: err,
        });
      });
  },
};
