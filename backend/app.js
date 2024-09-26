const express= require('express');
const app = express()
const cors = require('cors');
const route = require("./routes/route")
const connect = require("./connect/connect")
app.use(express.json());
app.use(cors());
connect().then(() => {
    console.log('Connection process complete.');
  }).catch((error) => {
    console.error('Connection process failed:', error);
  });
  
app.use("/",route)

module.exports = app;
