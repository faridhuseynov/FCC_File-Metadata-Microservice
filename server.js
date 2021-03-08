const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));

const port = process.env.PORT||3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (
  req,
  res,
  next
) {
  // req.file is the `document` file
  var document = req.file;
  res.json({"name":document.originalname,"type":document.mimetype,"size":document.size});
});

app.listen(port,()=>{
  console.log("App is running on port: "+port);
})