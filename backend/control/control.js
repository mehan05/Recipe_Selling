const { RecepieCreatingDataModel_1 } = require("../models/model");
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const createMulter = () => {
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
      cb(null, uniqueSuffix);
    }
  });

  return multer({ storage });
};

const uploadImage = async (req, res) => {
  const uploadDir = path.join(__dirname, 'uploads');
  try {
    const newImage = new RecepieCreatingDataModel_1({
      image: {
        name: req.file.filename,
        filePath: path.join(uploadDir, req.file.filename),
        contentType: req.file.mimetype
      },
      price: req.body.price,
      name: req.body.name,
      recepie: req.body.recepie,
      allergents: req.body.allergents,
      Bought: req.body.Bought,
      Income: req.body.Income
    });

    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully!', imageId: newImage._id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

const getImage = async (req, res) => {
    try {
      const images = await RecepieCreatingDataModel_1.find({});
  
      if (!images.length) return res.status(404).json({ error: 'No data found' });
  
      const imagesData = images.map(image => ({
        id: image._id,
        image: {
          name: image.image.name,
          contentType: image.image.contentType,
          filePath: image.image.filePath
        },
        price: image.price,
        name: image.name,
        recepie: image.recepie,
        allergents: image.allergents,
        Bought: image.Bought,
        Income: image.Income
      }));
  
      res.status(200).json(imagesData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  };



  
const getImageById = async (req, res) => {
    try {
      const images = await RecepieCreatingDataModel_1.findById(req.params.id);
  
      if (!images.length) return res.status(404).json({ error: 'No data found' });
  
      const imagesData = images.map(image => ({
        id: image._id,
        image: {
          name: image.image.name,
          contentType: image.image.contentType,
          filePath: image.image.filePath
        },
        price: image.price,
        name: image.name,
        recepie: image.recepie,
        allergents: image.allergents,
        Bought: image.Bought,
        Income: image.Income
      }));
  
      res.status(200).json(imagesData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  };


module.exports = { uploadImage, getImageById, getImage, createMulter };
