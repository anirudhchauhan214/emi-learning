const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

require("./db/connection");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/routes"));

app.listen(port, () => {
  console.log("Listening at http://localhost:" + port);
});
