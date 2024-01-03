const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors=require("cors")
const taskRoute=require("./routes/taskRoute")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connection to db is done..");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("Running successfully at", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Error in db connection " + error);
  });


  app.use(taskRoute)