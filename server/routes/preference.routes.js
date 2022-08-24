const PreferenceController = require("../controllers/preference.controller");

module.exports = (app) => {
  app.get("/api/preferences", PreferenceController.getPreferences);
  app.get("/api/preference/:id", PreferenceController.getPreferenceById);
  app.post("/api/preference", PreferenceController.createPreference);
  app.put("/api/preference/:id", PreferenceController.updatePreference);
  app.delete("/api/preference/:id", PreferenceController.deletePreference);
};
