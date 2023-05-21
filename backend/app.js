require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') { // port already in use, use alternative port
    const altPort = port + 1;
    console.log(`Port ${port} is already in use. Trying port ${altPort}`);
    server.listen(alternativePort, (err) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log(`Server is running on port ${altPort}`);
    });
  } else {
    console.error(error);
  }
});

mongoose.connect(
 "mongodb+srv://aze:" + process.env.MONGO_ATLAS_PW + "@gymdiary.dwn62zx.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => {
  console.log("Connected to database!");
}).catch((err) => {
  console.log(err);
});

