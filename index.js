var express = require("express");
var app = express();
app.get("/", (req, res) => {
  res.send("hello");
});
const port = 3000;
app.listen(port, () => {
  console.log("server is working at http://localhost:" + port);
});
