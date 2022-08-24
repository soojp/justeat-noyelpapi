const mongoose = require("mongoose");
const mongoEndpoint = "mongodb://localhost/";
const dbName = "eats";

mongoose
  .connect(mongoEndpoint + dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to the ${dbName} db`))
  .catch((err) => console.log(`ERROR CONNECTED TO DB`, err));
