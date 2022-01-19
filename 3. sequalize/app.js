const express = require("express");
const app = express();
require("../3. sequalize/models/index");

const port = 3000;

app.use(express.json());
app.use(require("../3. sequalize/routes"));

app.listen(port, () => console.log("Listen on port http://localhost:" + port));
