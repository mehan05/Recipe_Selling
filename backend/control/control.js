const { RecepieCreatingDataModel_1,UserModel_1 } = require("../models/model");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose')

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

const registerUser = async (req, res) => {
  const { address, name } = req.body;

  try {
    
    const newUser = new UserModel_1({ name , address, recipes: [] });
    await newUser.save();
  
    return res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
      console.log("Error from register",error);
      return res.status(500).json({message:"Issue With Register",error:error});
  }

};

const loginUser = async (req, res) => {
  const { name,address } = req.body;
  try {
      const existingUser = await UserModel_1.findOne({ address });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found. Please register!' });
      }
      return res.status(200).json({ message: 'Login successful!', user: existingUser });
  } catch (error) {
    console.log(error);
  }
};


const uploadImage = async (req, res) => {
      let id = new mongoose.Types.ObjectId();

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  let parsedAllergents;
  try {
    parsedAllergents = JSON.parse(req.body.allergents);
  } catch (error) {
    return res.status(400).json({ error: 'Invalid allergents JSON format' });
  }

  try {
    const newImage = new RecepieCreatingDataModel_1({
      image: {
        name: req.file.filename,
        filePath: `/uploads/${req.file.filename}`, 
        contentType: req.file.mimetype
      },
      price: req.body.price,
      name: req.body.name,
      id,
      recepie: req.body.recipe,
      description:req.body.description,
      typeOfDish: req.body.dishType,
      allergents: parsedAllergents,
      Bought:0,
      Income:0
    });

    console.log(newImage);
    await newImage.save();
    res.status(200).json({ message: 'Image uploaded successfully!', data: newImage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};


const getImage = async (req, res) => {
    try {
      const images = await RecepieCreatingDataModel_1.find({});
      console.log(images);
      console.log("hi hello");
  
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
      console.log(imagesData);
      res.status(200).json({imagesData});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  };
  
const getImageById = async (req, res) => {
    try {
      const images = await RecepieCreatingDataModel_1.findById(req.params.id);
  
      if (!images) return res.status(404).json({ error: 'No data found' });
  
      const imagesData = [images].map(image => ({
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
      console.log(imagesData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  };

  const updateData =  async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    console.log('Request body:', req.body);
console.log('Request params ID:', req.params.id); 
    try {
      const objectId = new mongoose.Types.ObjectId(id);
     
      const updatedRecipe = await RecepieCreatingDataModel_1.findOneAndUpdate(
        { _id: id }, 
        updatedData
      );
  
      if (!updatedRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
  
      res.json({ message: "Recipe updated successfully", updatedRecipe });
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ message: "Server error" });
    }
  }


module.exports = { uploadImage, getImageById, getImage, createMulter,updateData ,registerUser,loginUser};
