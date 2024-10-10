const { RecepieCreatingDataModel_1,UserModel_1,UserBought_1 } = require("../models/model");
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
  const { walletAddress, username, position } = req.body;
  console.log("wallet Address from register:",walletAddress)
  let position_1 = null;
  if(position)
  {
    position_1="Chef";
  }
  else{
    position_1="User";
  }
  try {

    const checking = await UserModel_1.findOne({walletAddress});
    if(checking )
    {
      return res.status(202).json({message:"User already register"});
    }

    const newUser = new UserModel_1({ name:username , address:walletAddress,position: position_1,recipes: [] });
    await newUser.save();

    if(position)
      {
        return res.status(203).json({message:"chef"});
      }
      else{
      return  res.status(204).json({message:"user"});
      }
   
  
  
  } catch (error) {
      console.log("Error from register",error);
      return res.status(500).json({message:"Issue With Register",error:error});
  }

};

const loginUser = async (req, res) => {
  const { username,walletAddress } = req.body;
  console.log("name",username);
  console.log("address",walletAddress);
  try {
      const existingUser = await UserModel_1.findOne({ address:walletAddress });
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found. Please register!' });
      }

      if (existingUser.position === 'Chef') {
        return res.status(202).json({ message: 'Login successful as Chef!', user: existingUser });
      } else if (existingUser.position === 'User') {
        return res.status(203).json({ message: 'Login successful as User!', user: existingUser });
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
      chefAddress:req.body.chefAddress,
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

    const user = await UserModel_1.findOne({ address: req.body.chefAddress });
    if (user) {
      user.recipes.push(newImage._id);
      await user.save();  
    }

    res.status(200).json({ message: 'Image uploaded and linked to user successfully!', data: newImage });

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
        chefAddress:image.chefAddress,
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

  const BoughtHandle = async(req,res)=>{
      const {signer,username,id,price} = req.body;
      let count = 0;
      console.log(req.body)
      try {
        const recipe = await RecepieCreatingDataModel_1.findById(id);
        if(!recipe)
        {
          return res.status(404).json({message:"recipe Not found"});
        }
        const existingPurchase = await UserBought_1.findOne({
          address: signer,
          recipeBought: id 
        });
    
        if (existingPurchase) {
          return res.status(400).json({ message: "User has already bought this recipe" });
        }

        const adding = new UserBought_1({
          id:id,
          address:signer,
          name:username,
          recipeBought:[id]
        });
        await adding.save();

        recipe.Bought = recipe.Bought?recipe.Bought+1: 0;
        recipe.Income = recipe.Income? recipe.Income+Number(price):0;

        await recipe.save();


        return res.status(200).json({message:"Recipe Bought Successfully",adding})
      } catch (error) {
        console.log(error);
      }
  }

  const checkBought = async(req,res)=>{
    const{signer,id} =req.body;
    const checking= await UserBought_1.findOne({id: id});
    if(checking)
    {
      return res.status(200).json({message:"success",id})
    }
    return res.status(201).json({message:"Failed"});
  }


module.exports = {BoughtHandle, uploadImage, getImageById, getImage, createMulter,updateData ,registerUser,loginUser,checkBought};
