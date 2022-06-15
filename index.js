const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./router/users");
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.json()); // for parsing application/json
// app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const myLogger = function (req, res, next) {
   req.time = new Date();
   next();
};

const mongoose = require("mongoose");

main().catch((err) => console.log("error :", err));

async function main() {
   await mongoose.connect("mongodb://localhost:27017/test");
   console.log("mongoose connected");
}

app.use(myLogger);

app.set("view engine", "ejs");
app.use("/assets", express.static("public"));

app.get("/", (req, res) => {
   const kelas = {
      id: 1,
      nama: "Seni",
      date: req.time.toString(),
   };
   res.render("pages/index", { kelas });
});

app.get("/about", (req, res) => {
   res.render("pages/about");
});

app.use(userRouter);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
