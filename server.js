const express = require("express");
const app = express();
const port = 53124;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`app listening on port ${port}!`));
