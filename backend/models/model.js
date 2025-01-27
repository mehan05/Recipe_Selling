const mongoose = require("mongoose");
const UserBought = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    name: {
        type: String,
        required: true,
    },

    recipeBought: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CreatedDetails"
    }]
    
    
})
const UserModel  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    position:{
        type:String,
        required:true
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CreatedDetails'
    }]

})
const RecepieCreatingDataModel = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    chefAddress:{
        type:String,
        required:true
    },
    image: {
        name: String,
        filePath: String,
        contentType: String,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    recepie:{
        type:String,
        required:true
    },
    allergents:{
        type:[{type:String}],
    },
    typeOfDish:{
        type:String,
        required:true
    },
    Bought: {
        type: Number,
    },
    Income: {
        type: Number,
    }
})
const RecepieCreatingDataModel_1 = mongoose.model('CreatedDetails',RecepieCreatingDataModel)
const UserModel_1 = mongoose.model('User',UserModel)
const UserBought_1 = mongoose.model('UserBought',UserBought);
module.exports ={ RecepieCreatingDataModel_1,UserModel_1,UserBought_1};
