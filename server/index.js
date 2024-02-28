const express = require("express");
const mongoose = require("mongoose");
const Guy = require("./models/Guys");
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
const uri ="mongodb+srv://1osvaldoz:<Password>@cluster0.7ubkkog.mongodb.net/Posada?retryWrites=true&w=majority"
mongoose
  .connect(uri)
  .then(() => {
    console.log("coonnected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000);
const routes = ["index", "add-item"];
app.get("/", (req, res) => {
  res.sendFile(`./views/index.html`, { root: __dirname });
});
routes.map((item) => {
  app.get("/", (req, res) => {
    res.sendFile(`./views/${item}.html`, { root: __dirname });
  });
});

app.get("/createGuys", (req, res) => {
  const today = new Date();
  const todayUTC = new Date(today.toUTCString());

  var GuysList = require("./data/GuyData.json");

  const newItems = GuysList.map((item) => {
    const name = item.email.split("@")[0].replace(".", " ");
    const email = String(item.email).toLocaleLowerCase();
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
  Guy.insertMany(newItems)
    .then(function () {
      res.send("<h1>Data inserted</h1>"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
      res.send("<h1>Error</h1><br/>"+JSON.stringify(error));
    });
});

app.get("/getGuyByEmail/:email", (req, res) => {
  Guy.findOne({ email: req.params.email }).then((result) =>
    res.send(result)
  );
});
app.get("/getGuyByGUID/:GUID", (req, res) => {
  Guy.findOne({ guid: req.params.GUID }).then((result) =>
    res.send(result)
  );
});
app.get("/getGuyOnSite/:city", (req, res) => {
  Guy.find({ arrived: true, city: req.params.city }).then((result) =>
    res.send(result)
  );
});
app.get("/registerAttendance/:GUID", (req, res) => {
  const today = new Date();
  const todayUTC = new Date(today.toUTCString());
  const update = { arrived: true, arrivedDateTimeUTC: todayUTC };
  Guy.findOneAndUpdate({ guid: req.params.GUID }, update).then((result) =>
    res.send(result)
  );
});
app.use((req, res) => {
  res.sendFile("./views/error.html", { root: __dirname });
});
