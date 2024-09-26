require('dotenv').config();
const mongoose =require('mongoose');
const main = () => {
    return new Promise((resolve, reject) => {
      try {
        const mongoURI = process.env.CONNECTION_STRING;
        mongoose.connect(mongoURI)
        .then(() => {
          console.log('Connected to MongoDB successfully!');
          resolve();  
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error.message);
          reject(error); 
        });
      } catch (error) {
        console.error('Error in main function:', error.message);
        reject(error);  
      }
    });
  };

  module.exports = main;