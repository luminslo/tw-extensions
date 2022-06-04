const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

app.get("/extensions/:slug", (req, res) => {
  fs.existsSync(`${process.cwd()}/exts/${req.params.slug}.js`)
    ? loadExtension()
    : res.send(
        "There was a problem loading this extension, either it doesn't exist or something else happened."
      );

  function loadExtension() {
    const filePath = path.join(
      `${process.cwd()}/`,
      `exts/${req.params.slug}.js`
    );
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  }
});

const port = 3000;
app.listen(port, () => console.log(`tw-extensions is running on port ${port}`));
