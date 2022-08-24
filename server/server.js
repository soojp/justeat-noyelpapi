require("./config/mongoose.config");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

require("./routes/preference.routes")(app);

app.listen(PORT, () => console.log(`Server is up on ${PORT}`));
