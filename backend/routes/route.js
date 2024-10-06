const express = require('express');
const router = express.Router();
const { uploadImage, getImageById, getImage, createMulter,updateData,loginUser,registerUser } = require("../control/control");

const upload = createMulter();

router
  .post('/upload', upload.single('image'), uploadImage)
  .get('/images', getImage)
  .get('/image/:id', getImageById)
  .put('/image/:id',updateData)
  .put('/register',registerUser)
  .put('/login',loginUser)

module.exports = router;
