var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require("fs");

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


const publicDir = path.join(__dirname, "public"); // setting the default static folder to the public folder
const imagesDir = path.join(publicDir, "/images/");

function createJson(imagePath, id, source) {
  let imageData = {
    id: id,
    description: source,
    source: imagePath,
  }

  let filePath = publicDir + `\\imagesData\\${imageData.id}.json`;
  fs.writeFileSync(filePath, JSON.stringify(imageData));
}

router.get('/snap', function (req, res) {
  let sampleFile = req.body.image;
  // remove the start of the string that contains "data:image/png;base64,"
  let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
  //create buffer to save to local system
  let buf = Buffer.from(data, "base64");

  let source = "webcam";
  let time = Date.now();
  let imagePath = imagesDir + time + ".png";

    // using write file to save the data
  createJson(imagePath, time, source);
  fs.writeFile(imagePath, buf, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("image saved");
      res.send("image saved");
    }
  });
});

router.get('/upload', function (req, res) {
  let sampleFile = req.body.image;
  // remove the start of the string that contains "data:image/png;base64,"
  let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
  //create buffer to save to local system
  let buf = Buffer.from(data, "base64");

  let source = "upload";
  let time = Date.now();
  let imagePath = imagesDir + time + ".png";

    // using write file to save the data
  createJson(imagePath, time, source);
  fs.writeFile(imagePath, buf, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("image saved");
      res.send("image saved");
    }
  });
});


router.get('/getimages', function (req, res) {
  let path = publicDir + "\\imagesData";
  let fileStreamReadDir = fs.readdirSync(path);
  let arrResponse = [];

  for (let index = 0; index < fileStreamReadDir.length; index++) {
    const f = fs.readFileSync(path + "\\" + fileStreamReadDir[index]);
    arrResponse.push(JSON.parse(f));
  }

  res.send(arrResponse);
});

router.get('/displayimages/:id', function (req, res) {
  let path = imagesDir + `\\${req.params.id}.png`;
  res.sendFile(path);
});




module.exports = router;