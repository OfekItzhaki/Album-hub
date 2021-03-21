const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const url = require("url");
// const router = require("./routes/router");

// app.use('/', router);

// app.use(express.static(__dirname + '/public'));

// // Case router didn't catch anything
// app.get('*', function (req, res) {
//    res.sendFile(path.join(__dirname + '/public/pages/404.html'));
//  });




app.use(bodyParser.urlencoded());
// have to set big limit to transfer image
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

const storageDir = path.join(__dirname, "storage");  // setting the default static folder to the storage folder
let imagesDirPath;
let jsonFilesPath;
const jsonFilesNameAdditional = "JSONfiles";

fs.access(storageDir, (err) => {
  if (err) {
    fs.mkdir(storageDir, (err) => {
      if (err) console.log("real problem !!!!");
    });
  }
});

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};




app.use((req, res, next) => {
  scanContentFolderInfo();
  next();
});

app.post("/createfolder", function (req, res) {
  let id = req.body.id;
  let description = req.body.description;
  let allowCamera = req.body.allowCamera;
  let allowLocation = req.body.allowLocation;
  let privateMode = req.body.privateMode;
  let privateKey = req.body.privateKey;

  createFolderJSON(allowCamera, allowLocation, privateMode, privateKey, id, description);
  // CREATE THE ACTUAL FOLDER
  createDir_Expanded(id);

  // CREATE THE ACTUAL IMAGE DATA CONTENT FOLDER
  jsonFilesPath = id + jsonFilesNameAdditional;
  createDir_Expanded(jsonFilesPath);
});


function createFolderJSON(allowCamera, allowLocation, privateMode, privateKey, id, description) {
  let folderData = {
    id: id,
    description: description,
    allowCamera: allowCamera,
    allowLocation: allowLocation,
    privateMode: privateMode,
    privateKey: privateKey,
  }

  let filePath = storageDir + `\\${folderData.id}.json`;
  fs.writeFileSync(filePath, JSON.stringify(folderData));
}




function createDir(dirName) {
  const newDirPath = path.join(storageDir, dirName);
  try {
    fs.mkdir(newDirPath, (err) => {
      if (err) {
        throw err;
      } else {
        console.log("Dir was created....");
      }
    });
  } catch (error) {
    console.log("ERROR :" + error);
  }
}


const checkPermissions = file => {
  try {
    fs.accessSync(file, fs.constants.F_OK);
    console.log('File exists'); // OR - I have permissions to the file
    return true;
  } catch (err) {
    console.error('File doesnt exists '); // OR - I do NOT have permissions to the file
    return false;
  }
};

function createDir_Expanded(dirName) {
  let newDirPath = path.join(storageDir, dirName);
  if (checkPermissions(newDirPath)) {

    // counter = 1;
    // do {
    //   counter++;
    //   nameAndNumber = dirName + counter;
    //   newDirPath = path.join(__dirname, nameAndNumber);
    //   }
    //    while (checkPermissions(newDirPath) == true);

    //   createDir("Ofek" + counter);
  }
  
  else {
    createDir(dirName);
  }
}



// checks if a folder already exists and returns the appropriate response
app.get("/folderexists", (req, res) => {
  file = scanContentFolderInfo();

  if (file == null) {
    res.send(false);
  }
  
  else {
    res.send(true);
  }
})


function scanContentFolderInfo() {
  let path = storageDir;
  let fileStreamReadDir = fs.readdirSync(path);
  let file = null;

  for (let index = 0; index < fileStreamReadDir.length; index++) {
    try {
      const f = fs.readFileSync(path + "\\" + fileStreamReadDir[index]);
      file = JSON.parse(f);
      break;
    }
    catch(e) {
      imagesDirPath = path + "\\" + fileStreamReadDir[index] + "\\";
      imagesDirName = fileStreamReadDir[index];

      jsonFilesPath = path + "\\" + fileStreamReadDir[index] + jsonFilesNameAdditional + "\\";
      jsonFilesName = imagesDirName + jsonFilesNameAdditional;
     }
  }

  // showing the result in the terminal
  // logResult(file);

  return file;
}


function logResult(file) {
  message = "json folder ";
  if (file == null) {
    console.log(message + "doesn't exists");
  }
  
  else {
    console.log(message + "exists: " + file.id );
  }
}









app.post("/snap", function (req, res) {
  let sampleFile = req.body.image;
  // remove the start of the string that contains "data:image/png;base64,"
  let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
  //create buffer to save to local system
  let buf = Buffer.from(data, "base64");

  let source = "webcam";
  let time = Date.now();
  let imagePath = imagesDirPath + time + ".png";

  let private = req.body.private;

    // using write file to save the data
  createImageJSON(imagePath, time, source, private);
  
  fs.writeFile(imagePath, buf, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("image saved");
      res.send("image saved");
    }
  });
});





app.post("/upload", function (req, res) {
  let sampleFile = req.body.image;
  let private = req.body.private;

  // remove the start of the string that contains "data:image/png;base64,"
  let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
  //create buffer to save to local system
  let buf = Buffer.from(data, "base64");

  let source = "upload";
  let time = Date.now();
  let imagePath = imagesDirPath + time + ".png";

    // using write file to save the data
  createImageJSON(imagePath, time, source, private);
  
  fs.writeFile(imagePath, buf, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("image saved - id: " + time);
      res.send("image saved - id: " + time);
    }
  });
});


function createImageJSON(imagePath, id, source, private = false) {
  let imageData = {
    id: id,
    description: source,
    source: imagePath,
    favorite: false,
    private: private,
  }

  let filePath = `${jsonFilesPath}\\${imageData.id}.json`;
  fs.writeFileSync(filePath, JSON.stringify(imageData));
}



// returns the details of a specific image
app.get("/displayimages/:id", (req, res) => {
  let path = imagesDirPath + `\\${req.params.id}.png`;
  // console.log("id: " + req.params.id);
  // console.log("path: " + path);
  res.sendFile(path);
});



function getImages(imgMode) {
  let path = jsonFilesPath;
  let fileStreamReadDir = fs.readdirSync(path);
  let arrResponse = [];
  let imgArray = [];
  

  for (let index = 0; index < fileStreamReadDir.length; index++) {
    // console.log(fileStreamReadDir[index]);
    const f = fs.readFileSync(path + "\\" + fileStreamReadDir[index]);
    arrResponse.push(JSON.parse(f));
  }

  
  for (let index = 0; index < arrResponse.length; index++) {
    const image = arrResponse[index];

    // for favorite folder
    if (imgMode == "fav") {
      if (image.private == true) {
        imgArray.push(image);
      }
    }

    // for a specific private state folder
    if (image.private == imgMode) {
      imgArray.push(image);
    }
    
    // specifically for the JSON update!!!!
    else if (imgMode == null) {
      imgArray.push(image);
    }
  }

  return imgArray;
};


// returns a list of all the private images in the image folder
app.get("/favimages/:id", function (req, res) {
  let answer = compareKey(req.params.id);
  let Images;

  if (answer == true) {
    Images = getImages("publicfav"); 
  }
  else if (answer == false) {
    Images = getImages("privatefav"); 
  }
  else {
    Images = getImages("fav");
  }

  if (Images != null) {
    res.send(Images);
  }
});

// returns a list of all the public images in the image folder
app.get("/publicimages", function (req, res) {
  let publicImages = getImages(false);

  if (publicImages != null) {
    res.send(publicImages);
  }
});

// returns a list of all the private images in the image folder
app.get("/privateimages", (req, res) => {
  let privateImages = getImages(true);

  if (privateImages != null) {
    res.send(privateImages);
  }
});


function compareKey(recievedKey) {
  console.log("checking private key.. ");
  let file = scanContentFolderInfo();
  let privateKey = file.privateKey;

  if (privateKey == recievedKey) {
    return true;
  }
  else if (privateKey != req.params.id) {
    return false;
  }
  else {
    return null;
  }
}

app.get("/checkkey/:id", (req, res) => {
  console.log("checking private key.. ");
  let file = scanContentFolderInfo();
  let privateKey = file.privateKey;

  if (privateKey == req.params.id) {
    res.send(true);
  }
  else if (privateKey != req.params.id) {
    res.send(false);
  }
  else {
    res.send(null);
  }
});

app.post("/update", (req, res) => {
  let recievedImg = req.body.image;
  let newPrivate = req.body.private;
  let newFavorite = req.body.favorite;
  let allImages = getImages(null);
  let path;

  console.log("-------------------------------------------------------");
  console.log("recived img private: " + newPrivate);
  console.log("recived img fav: " + newFavorite);
  
  for (let index = 0; index < allImages.length; index++) {
    if (allImages[index].id == recievedImg.id) {
      path = jsonFilesPath + "\\" + allImages[index].id + ".json";

      console.log("previous private: " + allImages[index].private);
      console.log("previous fav: " + allImages[index].favorite);

      if (newPrivate != null) {
        allImages[index].private = newPrivate;
      }

      if (newFavorite != null) {
        allImages[index].favorite = newFavorite;
      }

      console.log("now private: " + allImages[index].private);
      console.log("now fav: " + allImages[index].favorite);

      fs.writeFileSync(path, JSON.stringify(allImages[index]));

      res.send("img updated - " + recievedImg.id);
      console.log("img updated - " + recievedImg.id);

      console.log("-------------------------------------------------------");
    }
  }
  
  res.send("operation failed");
});




// PORT
const PORT = 5555;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
