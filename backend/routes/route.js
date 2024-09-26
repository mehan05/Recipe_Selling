const express = require('express');
const router = express.Router();
const { uploadImage, getImageById, getImage, createMulter } = require("../control/control");

const upload = createMulter();

router
  .post('/upload', upload.single('image'), uploadImage)
  .get('/images', getImage)
  .get('/image/:id', getImageById);

module.exports = router;
