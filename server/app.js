const express = require("express");
const mongoose = require("mongoose");
const WizeLiner = require("./models/wizeliners");
const crypto = require("crypto");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const uri =
  "mongodb+srv://1osvaldoz:Papalote123$@cluster0.7ubkkog.mongodb.net/PosadaWizeliners2023?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => {
    console.log("coonnected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, "192.168.50.75");
const routes = ["index", "add-item"];
app.get("/", (req, res) => {
  res.sendFile(`./views/index.html`, { root: __dirname });
});
routes.map((item) => {
  app.get("/", (req, res) => {
    res.sendFile(`./views/${item}.html`, { root: __dirname });
  });
});

app.get("/createWizeliners", (req, res) => {
  const today = new Date();
  const todayUTC = new Date(today.toUTCString());

  var wizelinersList = require("./data/wizelinerData.json");

  const newItems = wizelinersList.map((item) => {
    const name = item.email.split("@")[0].replace(".", " ");
    const email = item.email;
    const city = item.data.split(" ")[0];
    const newItem = {
      _id:email,
      name,
      email,
      city,
      createdDateTimeUTC: todayUTC,
      arrived: false,
      guid: crypto.randomUUID(),
    };
    
    return newItem;
  });
  WizeLiner.insertMany(newItems)
    .then(function () {
      res.send("<h1>Data inserted</h1>"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
      res.send("<h1>Error</h1><br/>"+JSON.stringify(error));
    });
});

app.get("/getWizelinerByEmail/:email", (req, res) => {
  WizeLiner.findOne({ email: req.params.email }).then((result) =>
    res.send(result)
  );
});
app.get("/getWizelinerByGUID/:GUID", (req, res) => {
  WizeLiner.findOne({ guid: req.params.GUID }).then((result) =>
    res.send(result)
  );
});
app.get("/getWizelinerOnSite/:city", (req, res) => {
  WizeLiner.find({ arrived: true, city: req.params.city }).then((result) =>
    res.send(result)
  );
});
app.get("/registerAttendance/:GUID", (req, res) => {
  const today = new Date();
  const todayUTC = new Date(today.toUTCString());
  const update = { arrived: true, arrivedDateTimeUTC: todayUTC };
  WizeLiner.findOneAndUpdate({ guid: req.params.GUID }, update).then((result) =>
    res.send(result)
  );
});
app.use((req, res) => {
  res.sendFile("./views/error.html", { root: __dirname });
});
