const express = require("express");
//const app = express();
const path = require("path");
const db = require("./db");
app = require("./app");

app.use("/assets", express.static(path.join(__dirname, "assets")));
const fileUpload = require("express-fileupload");

app.use(fileUpload());

//Upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${_dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

const port = process.env.PORT || 3090;

db.sync().then(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
