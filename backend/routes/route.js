const express = require('express');
const router = express.Router();
const { uploadImage,checkBought, getImageById, BoughtHandle,getImage, createMulter,updateData,loginUser,registerUser } = require("../control/control");

const upload = createMulter();

router
  .post('/upload', upload.single('image'), uploadImage)
  .get('/images', getImage)
  .get('/image/:id', getImageById)
  .put('/image/:id',updateData)
  .post('/register',registerUser)
  .post('/login',loginUser)
  .post("/buy",BoughtHandle)
  .post("/checkBought",checkBought)

module.exports = router;
